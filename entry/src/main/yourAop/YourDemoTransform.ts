import { MethodTransformApi } from "./apis/MethodTransformApi";

/**
 * 演示Transform实现流程
 * step 一:
 *  函数开头插入 const tsCompileApi = "ts compile api";
 * @see @see https://github.com/microsoft/TypeScript/blob/main/src/compiler/types.ts
 */
export class YourDemoTransform {
  static doTransform(ts) {
    return (context) => {
      return (sourceFile) => {
        function visit(node) {
          if (ts.isMethodDeclaration(node) && node.name && node.name.text === 'onForeground') {
           /* // 1.直接copy TypeScript AST Viewer 生成的代码
            const timeStampStatement = insertTimeStamp(ts, "startTime");
            // 2.修改 Logger.d 为 Logger.w
            const updateStatements = updateLoggerD2W(node, ts);
            // 3.将生成的代码插入到函数体中
            const newStatements = ts.factory.createNodeArray([timeStampStatement, ...updateStatements]);
            const newBody = ts.factory.updateBlock(node.body, newStatements);
            */
            // 1.直接替换
            const newStatements = replaceAllStatements(ts);
            // 2.更新函数体
            const newBody = ts.factory.createBlock([newStatements], true);
            // 3.更新node
            return ts.factory.updateMethodDeclaration(
              node, node.decorators, node.modifiers, node.asteriskToken,
              node.name, node.questionToken, node.typeParameters, node.parameters, node.type, newBody
            );
          }
          return ts.visitEachChild(node, visit, context);
        }
        return ts.visitNode(sourceFile, visit);
      };
    };
  }
}

function replaceAllStatements(ts) {
  return ts.factory.createExpressionStatement(
    ts.factory.createCallExpression(
      ts.factory.createPropertyAccessExpression(
        ts.factory.createIdentifier('AppStorage'),
        ts.factory.createIdentifier('setOrCreate')
      ),
      undefined,
      [
        ts.factory.createStringLiteral('IsForeground'),
        ts.factory.createTrue()
      ]
    )
  );
}

function updateLoggerD2W(node, ts) {
  return node.body.statements.map(statement => {
    if (ts.isExpressionStatement(statement) && ts.isCallExpression(statement.expression)) {
      const callExpr = statement.expression;
      if (ts.isPropertyAccessExpression(callExpr.expression) && callExpr.expression.name.text === 'd' &&
        callExpr.expression.expression.getText() === 'Logger') {
        const newPropertyAccess =
          ts.factory.updatePropertyAccessExpression(callExpr.expression, callExpr.expression.expression,
            ts.factory.createIdentifier('w'));
        const newCallExpr =
          ts.factory.updateCallExpression(callExpr, newPropertyAccess, callExpr.typeArguments, callExpr.arguments);
        return ts.factory.updateExpressionStatement(statement, newCallExpr);
      }
    }
    return statement;
  });
}

function insertTimeStamp(ts, variableName = 'startTime') {
  return ts.factory.createVariableStatement(
    undefined,
    ts.factory.createVariableDeclarationList(
      [ts.factory.createVariableDeclaration(
        ts.factory.createIdentifier(variableName),
        undefined,
        undefined,
        ts.factory.createCallExpression(
          ts.factory.createPropertyAccessExpression(
            ts.factory.createIdentifier('Date'),
            ts.factory.createIdentifier('now')), undefined, [])),],
      ts.NodeFlags.Const));
}
