import { ReplaceRule } from "../../configs/parsers/BaseConfigParser";
import { ImportTransformApi } from "../apis/ImportTransformApi";

const SPLIT_FLAG = ":"
/**
 * AOP Transform : 方法调用替换
 * step 一:
 *  遍历找到函数调用， 比如router.pushUrl
 * step 二:
 *  将目标函数替换， 比如将router.pushUrl替换为 this.getUIContext().getRouter().pushUrl
 */
export class AspectProTransform {
  static doTransform(ts, allReplaceRules: ReplaceRule[]) {
    return (context) => {
      return (sourceFile) => {
        const importsToAdd = new Set<string>();
        const visit = (node) => {
          if (!node) {
            return node;
          }
          let updatedNode = node;
          for (let rule of allReplaceRules) {
            if (!rule) {
              continue;
            }
            if (this.isFunctionCallMatch(node, rule.pattern, ts)) {
              updatedNode = this.replaceFunctionCall(node, rule.pattern, rule.replacement, ts);
              if (rule.imports) {
                for (let imp of rule.imports) {
                  importsToAdd.add(imp);
                }
              }
            }
          }
          return ts.visitEachChild(updatedNode, visit, context);
        };

        let updatedSourceFile = ts.visitNode(sourceFile, visit);
        for (let imp of importsToAdd) {
          if (!imp || typeof imp !== 'string' || !imp.includes(SPLIT_FLAG) || imp.split(SPLIT_FLAG).length !== 2) {
            return updatedSourceFile;
          }

          const [importName, importPath] = imp.split(SPLIT_FLAG);

          updatedSourceFile =
            ImportTransformApi.addImportStatement(updatedSourceFile, ts, importName, importPath);
        }

        return updatedSourceFile;
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

  static replaceFunctionCall(node, from, to, ts) {
    if (!node || !from || !to) {
      return node;
    }

    const fromParts = from.split(SPLIT_FLAG);
    const toParts = to.split(SPLIT_FLAG);
    if (fromParts.length < 2 || toParts.length < 2) {
      return node;
    }

    if (node.pos < 0 || node.end < 0) {
      return node;
    }

    let newExpression = ts.factory.createIdentifier(toParts[0]);
    for (let i = 1; i < toParts.length; i++) {
      newExpression = ts.factory.createPropertyAccessExpression(newExpression, ts.factory.createIdentifier(toParts[i]));
    }

    if (ts.isCallExpression(node)) {
      return ts.factory.createCallExpression(newExpression, node.typeArguments, node.arguments);
    }

    return node;
  }

}

