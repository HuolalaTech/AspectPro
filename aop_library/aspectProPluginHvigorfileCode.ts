import { hapTasks } from '@ohos/hvigor-ohos-plugin';
import { getNode, HvigorNode, HvigorPlugin } from '@ohos/hvigor';

/**
 * AspectPro-Plugin                     (源码回滚方案)
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

let filesAndRules = {};

function localAspectProPlugin(): HvigorPlugin {
  return {
    pluginId: 'localAspectProPlugin',
    apply: (node: HvigorNode) => {
      node.registerTask({
        name: 'aspectProPluginInjectTask',
        run: (taskContext) => {
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

function injectAspectProPlugin(node: HvigorNode) {
  console.log(TAG, '------------start aspectProPlugin -----------------');

  if (!node?.nodeDir?.filePath) {
    return;
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

  allFiles =
    allFiles.filter(filePath => /\.(ts|js|ets)$/.test(filePath));

  allFiles.forEach(filePath => processFile(filePath, replaceRules, false));
  console.log(TAG, '------------end aspectProPlugin -----------------');

  return { allFiles, replaceRules };
}

function reInjectAspectProPlugin(allFiles, replaceRules) {
  console.log(TAG, '============start reset aspectProPlugin =================');
  if (!allFiles || !replaceRules) {
    console.error(TAG, 'ERROR: Missing required parameters for reInjectAspectProPlugin.');
    return;
  }
  allFiles.forEach(filePath => processFile(filePath, replaceRules, true));
  console.log(TAG, '============end reset aspectProPlugin =================');
}

function resolvePath(filePath, rootDir) {
  let absPath = path.isAbsolute(filePath) ? filePath : path.resolve(rootDir, `.${path.sep}${filePath}`);
  return absPath
}

function readConfigFile(configFilePath, rootDir) {
  const filesToProcess: string[] = [];
  const keepFiles: string[] = [];
  const replaceRules: {
    pattern: string,
    replacement: string,
    imports: string[]
  }[] = [];

  const lines = fs.readFileSync(configFilePath, 'utf-8').split('\n');
  const replaceRegex = /^-replace\s+([^\s]+)\s+([^\s]+)\s*(?:\[(.*)\])?/;

  lines.map(line => line.trim())
    .filter(line => line.length > 0 && !line.startsWith('#'))
    .forEach(line => {
      if (line.startsWith('-hook ')) {
        filesToProcess.push(resolvePath(line.substring(6).trim(), rootDir));
      } else if (line.startsWith('-keep ')) {
        keepFiles.push(resolvePath(line.substring(6).trim(), rootDir));
      } else if (replaceRegex.test(line)) {
        const match = replaceRegex.exec(line);
        if (match) {
          const pattern = match[1];
          const replacement = match[2];
          const imports =
            match[3] ? match[3].split('import ').filter(Boolean).map(s => 'import ' + s.trim().replace(/;?\s*$/, ';')) :
              [];
          replaceRules.push({ pattern: escapeRegExp(pattern), replacement, imports });
        }
      }
    });

  return { filesToProcess, keepFiles, replaceRules };
}

function escapeRegExp(string) {
  return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
}

function unescapeRegExp(string) {
  return string.replace(/\\([.*+\-?^${}()|[\]\\])/g, '$1');
}

function getAllFiles(dir, keepFiles, fileList = []) {
  if (!fs.existsSync(dir)) {
    console.error(TAG, `ERROR: Directory does not exist: ${dir}`);
    return fileList;
  }

  fs.readdirSync(dir).forEach(file => {
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

function shouldKeep(filePath, keepFiles) {
  return keepFiles.some(keepFile => filePath.startsWith(keepFile));
}

function processFile(filePath, replaceRules, isReverse) {
  let contentLines = fs.readFileSync(filePath, 'utf-8').split('\n');
  let modified = false;

  if (isReverse) {
    replaceRules.forEach(({ imports }) => {
      imports.forEach(importStatement => {
        contentLines = contentLines.filter(line => line.trim() !== importStatement.trim());
      });
    });
  }

  replaceRules.forEach(({ pattern, replacement, imports }) => {
    const searchPattern = isReverse ? escapeRegExp(replacement) : pattern;
    const replaceValue = isReverse ? unescapeRegExp(pattern) : replacement;
    const regex = new RegExp(searchPattern, 'g');

    contentLines.forEach((line, index) => {
      if (line.match(regex)) {
        contentLines[index] = line.replace(regex, replaceValue);
        modified = true;
      }
    });

    if (!isReverse && modified) {
      imports.forEach(statement => {
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

export default {
  system: hapTasks, /* Built-in plugin of Hvigor. It cannot be modified. */
  plugins: [localAspectProPlugin()]
}

