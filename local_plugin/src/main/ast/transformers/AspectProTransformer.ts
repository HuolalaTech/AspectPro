/*
//@ts-ignore
import * as ts from 'typescript';
import { ReplaceRule } from '../../configs/parsers/BaseConfigParser';
import { insertImportStatement } from '../apis/ImportApis';
import { applyTransform } from '../apis/TransformerApis';

*/
/**
 * 替换函数调用
 * like: let a = a.x  ->  let a = b.y()
 *//*

export function replaceCallExpression(tsSourceFile: ts.SourceFile, replaceRules: ReplaceRule[]) {
  let transformedSourceFile = applyTransform(tsSourceFile, replaceCallExpressionVisitor, replaceRules);

  fileImports.forEach(importStatement => {
    const [importName, importPath] = importStatement.split(':');
    transformedSourceFile = insertImportStatement(transformedSourceFile, importName, importPath);
  });
  return transformedSourceFile;
}

const fileImports: Set<string> = new Set<string>();

function replaceCallExpressionVisitor(context: ts.TransformationContext,
  replaceRules: ReplaceRule[]): ts.Visitor {

  return function visit(node: ts.Node): ts.VisitResult<ts.Node> {
    try {
      if (ts.isExpressionStatement(node)) {
        const expression = node.expression;
        if (ts.isCallExpression(expression)) {
          const propAccessExpr = expression.expression;
          if (ts.isPropertyAccessExpression(propAccessExpr)) {
            const expressionNode = propAccessExpr.expression;
            const nameNode = propAccessExpr.name;
            const expressionText = (expressionNode as ts.Identifier).escapedText;
            const nameText = (nameNode as ts.Identifier).escapedText;

            for (const rules of replaceRules) {
              //@ts-ignore
              const matchedRule = rules.find(rule => {
                if (!rule.pattern || !rule.replacement) {
                  return false;
                }
                const [patternObject, patternMethod] = rule.pattern.split(':', 2);
                return expressionText === patternObject && nameText === patternMethod;
              });

              if (matchedRule) {
                const [replacementObject, replacementMethod] = matchedRule.replacement.split(':', 2);
                const newObjectNode = ts.factory.createIdentifier(replacementObject);
                const newExpression = ts.factory.createPropertyAccessExpression(newObjectNode, replacementMethod);
                const newCallExpression = ts.factory.createCallExpression(
                  newExpression,
                  undefined,
                  expression.arguments
                );

                matchedRule.imports?.forEach(imp => fileImports.add(imp));
                return ts.factory.createExpressionStatement(newCallExpression);
              }
            }
          }
        }
      }
      return ts.visitEachChild(node, visit, context);
    } catch (e) {
      console.error("replaceCallExpressionVisitor() Error processing node:", e);
    }
    return ts.visitEachChild(node, visit, context);
  };
}
*/
