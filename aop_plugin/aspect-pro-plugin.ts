import { hapTasks } from '@ohos/hvigor-ohos-plugin';
import { getNode, HvigorNode, HvigorPlugin } from '@ohos/hvigor';

/**
 * 远程plugin：用于发布到nmp仓库
 * aspect-pro-plugin                    (https://www.npmjs.com/package/aspect-pro-plugin/v/0.0.6?activeTab=versions)
 *
 * 1.-> aspectProPluginConfig.txt       配置源码相对路径(相对于RootDir)
 * 2.-> aspectProPluginInjectTask       根据配置修改源码
 * 3.-> compileArkTs task               源码编译-生成.abc文件
 * 4.-> resetAspectProPluginInjectTask  根据配置回滚源码修改
 *
 */

const TAG = "AspectPro-Plugin"
const node = getNode(__filename);
const fs = require('fs');
const path = require('path');

interface FilesAndRules {
  allFiles: string[];
  replaceRules: ReplaceRule[];
}

interface ReplaceRule {
  pattern: string;
  replacement: string;
  imports: string[];
}

let filesAndRules: FilesAndRules = { allFiles: [], replaceRules: [] };

export function aspectProPlugin(): HvigorPlugin {
  return {
    pluginId: 'aspectProPlugin',
    apply: (node: HvigorNode) => {
      node.registerTask({
        name: 'aspectProPluginInjectTask',
        run: () => {
          filesAndRules = injectAspectProPlugin(node);
        },
        postDependencies: ['default@CompileArkTS']
      });

      node.registerTask({
        name: 'resetAspectProPluginInjectTask',
        run: () => {
          reInjectAspectProPlugin(filesAndRules.allFiles, filesAndRules.replaceRules);
        },
        dependencies: ['default@CompileArkTS'],
        postDependencies: ['assembleHap']
      });
    }
  };
}

function injectAspectProPlugin(node: HvigorNode): FilesAndRules {
  console.log(TAG, '------------start aspectProPlugin -----------------');

  if (!node?.nodeDir?.filePath) {
    return { allFiles: [], replaceRules: [] };
  }

  const rootDir = node.nodeDir.filePath;
  const configFilePath = path.join(rootDir, 'aspectProPluginConfig.txt');
  const { filesToProcess, keepFiles, replaceRules } = readConfigFile(configFilePath, rootDir);

  let allFiles: string[] = [];
  if (filesToProcess.length > 0) {
    allFiles = filesToProcess.flatMap(fileOrDir => {
      if (fs.statSync(fileOrDir).isDirectory()) {
        return getAllFiles(fileOrDir, keepFiles);
      } else {
        return shouldKeep(fileOrDir, keepFiles) ? [] : [fileOrDir];
      }
    });
  } else {
    allFiles = getAllFiles(rootDir, keepFiles);
  }

  allFiles = allFiles.filter(filePath => /\.(ts|js|ets)$/.test(filePath));

  allFiles.forEach(filePath => processFile(filePath, replaceRules, false));
  console.log(TAG, '------------end aspectProPlugin -----------------');

  return { allFiles, replaceRules };
}

function reInjectAspectProPlugin(allFiles: string[], replaceRules: ReplaceRule[]): void {
  console.log(TAG, '============start reset aspectProPlugin =================');
  if (!allFiles || !replaceRules) {
    console.error(TAG, 'ERROR: Missing required parameters for reInjectAspectProPlugin.');
    return;
  }
  allFiles.forEach(filePath => processFile(filePath, replaceRules, true));
  console.log(TAG, '============end reset aspectProPlugin =================');
}

function resolvePath(filePath: string, rootDir: string): string {
  return path.isAbsolute(filePath) ? filePath : path.resolve(rootDir, `.${path.sep}${filePath}`);
}

function readConfigFile(configFilePath: string, rootDir: string): { filesToProcess: string[], keepFiles: string[], replaceRules: ReplaceRule[] } {
  const filesToProcess: string[] = [];
  const keepFiles: string[] = [];
  const replaceRules: ReplaceRule[] = [];

  const lines = fs.readFileSync(configFilePath, 'utf-8').split('\n');
  const replaceRegex = /^-replace\s+([^\s]+)\s+([^\s]+)\s*(?:\[(.*)\])?/;

  lines.map((line: string) => line.trim())
    .filter((line: string) => line.length > 0 && !line.startsWith('#'))
    .forEach((line: string) => {
      if (line.startsWith('-hook ')) {
        filesToProcess.push(resolvePath(line.substring(6).trim(), rootDir));
      } else if (line.startsWith('-keep ')) {
        keepFiles.push(resolvePath(line.substring(6).trim(), rootDir));
      } else if (replaceRegex.test(line)) {
        const match = replaceRegex.exec(line);
        if (match) {
          const pattern = match[1];
          const replacement = match[2];
          const imports = match[3] ? match[3].split('import ').filter(Boolean).map(s => 'import ' + s.trim().replace(/;?\s*$/, ';')) : [];
          replaceRules.push({ pattern: escapeRegExp(pattern), replacement, imports });
        }
      }
    });

  return { filesToProcess, keepFiles, replaceRules };
}

function escapeRegExp(string: string): string {
  return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
}

function unescapeRegExp(string: string): string {
  return string.replace(/\\([.*+\-?^${}()|[\]\\])/g, '$1');
}

function getAllFiles(dir: string, keepFiles: string[], fileList: string[] = []): string[] {
  if (!fs.existsSync(dir)) {
    console.error(TAG, `ERROR: Directory does not exist: ${dir}`);
    return fileList;
  }

  fs.readdirSync(dir).forEach((file: string) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      if (!shouldKeep(filePath, keepFiles)) {
        getAllFiles(filePath, keepFiles, fileList);
      }
    } else {
      if (!shouldKeep(filePath, keepFiles)) {
        fileList.push(filePath);
      }
    }
  });
  return fileList;
}

function shouldKeep(filePath: string, keepFiles: string[]): boolean {
  return keepFiles.some(keepFile => filePath.startsWith(keepFile));
}

function processFile(filePath: string, replaceRules: ReplaceRule[], isReverse: boolean): void {
  let contentLines = fs.readFileSync(filePath, 'utf-8').split('\n');
  let modified = false;

  if (isReverse) {
    replaceRules.forEach(({ imports }) => {
      imports.forEach((importStatement: string) => {
        contentLines = contentLines.filter((line: string) => line.trim() !== importStatement.trim());
      });
    });
  }

  replaceRules.forEach(({ pattern, replacement, imports }) => {
    const searchPattern = isReverse ? escapeRegExp(replacement) : pattern;
    const replaceValue = isReverse ? unescapeRegExp(pattern) : replacement;
    const regex = new RegExp(searchPattern, 'g');

    contentLines.forEach((line: string, index: number) => {
      if (line.match(regex)) {
        contentLines[index] = line.replace(regex, replaceValue);
        modified = true;
      }
    });

    if (!isReverse && modified) {
      imports.forEach((statement: string) => {
        if (!contentLines.includes(statement)) {
          contentLines.unshift(statement);
        }
      });
    }
  });

  if (modified) {
    fs.writeFileSync(filePath, contentLines.join('\n'), 'utf-8');
    console.warn(TAG, isReverse ? `File reset: ${filePath}` : `File modified: ${filePath}`);
  }
}