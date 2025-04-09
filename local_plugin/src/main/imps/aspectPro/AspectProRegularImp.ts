//@ts-ignore
import * as fs from 'fs';
import { escapeRegExp, ReplaceRule, unescapeRegExp } from '../../configs/parsers/BaseConfigParser';

const TAG = "AspectProImp"

/**
 * 此版本基于正则，已经废弃，改为基于AST语义结构
 * @see AspectProTsImp
 * @deprecated
 */
export class AspectProImp {
  static start(filePath: string, replaceRules: ReplaceRule[]) {
    core(filePath, replaceRules, false)
  }
}

function core(filePath: string, replaceRules: ReplaceRule[], isReverse: boolean) {
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

