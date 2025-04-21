import { ReplaceRule } from "../../configs/parsers/BaseConfigParser";
import { ImportTransformApi } from "../apis/ImportTransformApi";

const SPLIT_FLAG = ":"

/**
 * AOP Transform : 查找隐私Api调用
 * step 一:
 *  遍历找到隐私函数调用， 比如hilog.fatal (此处仅演示 - 因为demo依赖的Logger中调用了此aip)
 * step 二:
 *  打印出函数堆栈信息
 */
export class PrivacyMethodTransform {
  static doTransform(ts, allReplaceRules: ReplaceRule[]) {
    return (context) => {
      return (sourceFile) => {
        const visit = (node, curClassName, curMethodName) => {
          if (!node) {
            return node;
          }

          if (ts.isClassDeclaration(node) && node.name && node.name.getText) {
            curClassName = node.name.getText();
          } else if (ts.isMethodDeclaration(node) && node.name && node.name.getText) {
            curMethodName = node.name.getText();
          }

          for (let rule of allReplaceRules) {
            if (!rule) {
              continue;
            }
            if (this.isFunctionCallMatch(node, rule.pattern, ts)) {
              const { line } = ts.getLineAndCharacterOfPosition(sourceFile, node.getStart());

              const className = curClassName || 'UnknownClass';
              const methodName = curMethodName || 'UnknownMethod';
              console.log(`PrivacyMethodTransform-> [Found privacy API <${rule.pattern}>call in ${className}.${methodName} at line:${line + 1}]`);
            }
          }

          return ts.visitEachChild(node, (childNode) => visit(childNode, curClassName, curMethodName), context);
        };
        return ts.visitNode(sourceFile, (node) => visit(node, undefined, undefined));
        ;
      };
    };
  }

  static isFunctionCallMatch(node, pattern: string, ts): boolean {
    if (!node || !pattern || typeof pattern !== 'string' || !pattern.includes(SPLIT_FLAG)) {
      return false;
    }
    const patternParts = pattern.split(SPLIT_FLAG);
    if (patternParts.length < 2) {
      return false;
    }
    try {
      if (ts.isCallExpression(node)) {
        if (!node.expression) {
          return false;
        }

        const expr = node.expression;
        if (ts.isPropertyAccessExpression(expr) && expr.expression
          && ts.isIdentifier(expr.expression) && expr.name
          && ts.isIdentifier(expr.name)) {
          const isMatch = expr.expression.getText() === patternParts[0] && expr.name.getText() === patternParts[1];
          return isMatch;
        }
      }
    } catch (e) {
      return false;
    }
    return false;
  }
}

