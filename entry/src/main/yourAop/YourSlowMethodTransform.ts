import { ImportTransformApi } from './apis/ImportTransformApi';
import { MethodTransformApi } from './apis/MethodTransformApi';

const insertStartMethodName = 'Logger.w';
const insertEndMethodName = 'Logger.w';
const insertLogTag = 'SlowMethod';
const importName = 'Logger'
const importPath = '@package:pkg_modules/.ohpm/@huolala+logger@1.0.0/pkg_modules/@huolala/logger/src/main/com.wp/Logger'

/**
 * AOP Transform :插入代码统计方法执行耗时
 * step 一:
 *  函数开头插入 const startTime = Date.now();
 * step 二:
 *  函数结束插入 Logger.w(tag, `${methodId} took ${(Date.now() - startTime)} ms`)
 *
 * @see @see https://github.com/microsoft/TypeScript/blob/main/src/compiler/types.ts
 */
export class YourSlowMethodTransform {
  static doTransform(ts) {
    return (context) => {
      return (sourceFile) => {
        const visit = (node) => {
          if (!MethodTransformApi.supportsFunctions(node, ts)) {
            return ts.visitEachChild(node, visit, context);
          }

          if (MethodTransformApi.isSimpleOrEmptyMethod(node, ts)) {
            console.log(`simple method Visiting (kind: ${node.kind}) - Content: ${node.getText()}`);
            return ts.visitEachChild(node, visit, context);
          }

          let updatedNode = this.generateUpdatedMethod(node, ts, sourceFile);
          return ts.visitEachChild(updatedNode, visit, context);
        };

        let updatedSourceFile = ts.visitNode(sourceFile, visit);
        return ImportTransformApi.addImportStatement(updatedSourceFile, ts, importName, importPath);
      };
    };
  }

  static generateUpdatedMethod(node, ts, sourceFile) {
    const generateMethodAopStatements = (node) => {
      if (MethodTransformApi.supportsFunctions(node, ts)) {
        return this.doUpdateMethod(node, ts, sourceFile);
      } else if (ts.isPropertyAssignment(node)) {
        if (ts.isFunctionExpression(node.initializer) || ts.isArrowFunction(node.initializer)) {
          return this.doUpdateMethod(node, ts, sourceFile);
        }
      }
      return undefined;
    }

    const newMethodStatements = generateMethodAopStatements(node);

    const transformers = {
      [ts.SyntaxKind.FunctionDeclaration]: MethodTransformApi.generateFunctionDeclarationCode,
      [ts.SyntaxKind.FunctionExpression]: MethodTransformApi.generateFunctionExpressionCode,
      [ts.SyntaxKind.MethodDeclaration]: MethodTransformApi.generateMethodDeclarationCode,
      [ts.SyntaxKind.ArrowFunction]: MethodTransformApi.generateArrowFunctionCode,
      [ts.SyntaxKind.PropertyAssignment]: MethodTransformApi.generatePropertyAssignmentCode,
    };

    const transformFunction = transformers[node.kind];
    if (transformFunction) {
      if (node.kind === ts.SyntaxKind.PropertyAssignment && newMethodStatements === undefined) {
        return node;
      }
      return transformFunction(node, ts, newMethodStatements);
    }

    return node;
  }

  static doUpdateMethod(node, ts, sourceFile) {
    const newStatements: Array<typeof ts.Statement> = [];
    // 1.插入方法开始执行时间
    const startTimeVar = 'startTime';
    const methodId = MethodTransformApi.generateMethodId(node, sourceFile, ts);
    // 本示例中 仅统计函数执行耗时，入口函数可不插入，仅插入 const startTime = Date.now();
    // const beforeLogStatement = insertStartMethod();
    // newStatements.push(beforeLogStatement);
    newStatements.push(insertTimeStamp(startTimeVar));

    // 2.遍历插入方法结束耗时统计
    if (node.body && ts.isBlock(node.body)) {
      const updatedStatements = insertEndMethod(node.body.statements, ts, node, methodId, startTimeVar);
      newStatements.push(...updatedStatements);
    }

    return newStatements;

    function insertTimeStamp(variableName) {
      return ts.factory.createVariableStatement(
        undefined,
        ts.factory.createVariableDeclarationList(
          [
            ts.factory.createVariableDeclaration(
              ts.factory.createIdentifier(variableName),
              undefined,
              undefined,
              ts.factory.createCallExpression(
                ts.factory.createPropertyAccessExpression(
                  ts.factory.createIdentifier("Date"),
                  ts.factory.createIdentifier("now")
                ),
                undefined,
                []
              )
            )
          ],
          ts.NodeFlags.Const
        )
      );
    }

    function insertEndMethod(statements, ts, node, methodId, startTimeVar) {
      const updatedStatements: Array<typeof ts.Statement> = [];
      statements.forEach(statement => {
        if (ts.isIfStatement(statement)) {
          const thenBlock = ts.factory.updateBlock(
            statement.thenStatement,
            insertEndMethod(statement.thenStatement.statements, ts, node, methodId, startTimeVar)
          );
          const elseBlock = statement.elseStatement ? ts.factory.updateBlock(
            statement.elseStatement,
            insertEndMethod(statement.elseStatement.statements, ts, node, methodId, startTimeVar)
          ) : undefined;
          updatedStatements.push(
            ts.factory.updateIfStatement(
              statement,
              statement.expression,
              thenBlock,
              elseBlock
            )
          );
        } else if (ts.isReturnStatement(statement) || ts.isThrowStatement(statement)) {
          updatedStatements.push(...createEndLogStatements(ts, methodId, startTimeVar));
          updatedStatements.push(statement);
        } else if (ts.isTryStatement(statement)) {
          const tryBlock = ts.factory.updateBlock(
            statement.tryBlock,
            insertEndMethod(statement.tryBlock.statements, ts, node, methodId, startTimeVar)
          );
          const catchClause = statement.catchClause ? ts.factory.updateCatchClause(
            statement.catchClause,
            statement.catchClause.variableDeclaration,
            ts.factory.updateBlock(
              statement.catchClause.block,
              insertEndMethod(statement.catchClause.block.statements, ts, node, methodId, startTimeVar)
            )
          ) : undefined;
          const finallyBlock = statement.finallyBlock ? ts.factory.updateBlock(
            statement.finallyBlock,
            insertEndMethod(statement.finallyBlock.statements, ts, node, methodId, startTimeVar)
          ) : undefined;
          updatedStatements.push(
            ts.factory.updateTryStatement(
              statement,
              tryBlock,
              catchClause,
              finallyBlock
            )
          );
        } else if (ts.isBlock(statement)) {
          updatedStatements.push(ts.factory.updateBlock(
            statement,
            insertEndMethod(statement.statements, ts, node, methodId, startTimeVar)
          ));
        } else {
          updatedStatements.push(statement);
        }
      });

      if (!statements.some(s => ts.isReturnStatement(s) || ts.isThrowStatement(s))) {
        updatedStatements.push(...createEndLogStatements(ts, methodId, startTimeVar));
      }

      return updatedStatements;
    }

    function createEndLogStatements(ts, methodId, startTimeVar) {
      return [
        ts.factory.createExpressionStatement(
          ts.factory.createCallExpression(
            ts.factory.createIdentifier(insertEndMethodName),
            undefined,
            [
              ts.factory.createStringLiteral(insertLogTag),
              ts.factory.createBinaryExpression(
                ts.factory.createStringLiteral(`${methodId} took `),
                ts.SyntaxKind.PlusToken,
                ts.factory.createBinaryExpression(
                  ts.factory.createBinaryExpression(
                    ts.factory.createCallExpression(
                      ts.factory.createPropertyAccessExpression(
                        ts.factory.createIdentifier("Date"),
                        ts.factory.createIdentifier("now")
                      ),
                      undefined,
                      []
                    ),
                    ts.SyntaxKind.MinusToken,
                    ts.factory.createIdentifier(startTimeVar)
                  ),
                  ts.SyntaxKind.PlusToken,
                  ts.factory.createStringLiteral(" ms")
                )
              )
            ]
          )
        )
      ];
    }
  }
}

function insertStartMethod(ts, methodId) {
  return ts.factory.createExpressionStatement(
    ts.factory.createCallExpression(
      ts.factory.createIdentifier(insertStartMethodName),
      undefined,
      [
        ts.factory.createStringLiteral(insertLogTag),
        ts.factory.createStringLiteral(methodId)
      ]
    )
  );
}

