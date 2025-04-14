//@ts-ignore
// import * as ts from 'typescript';

function getNodeKindName(ts, kind) {
  for (let key in ts.SyntaxKind) {
    if (ts.SyntaxKind[key] === kind) {
      return key;
    }
  }
  return null;
}

export class SlowMethodTransform {
  static doTransform(ts) {
    return (context) => {
      const visit = (node) => {

        // const nodeKindName = getNodeKindName(ts, node.kind);
        // console.log(`Visiting node: ${nodeKindName} (kind: ${node.kind}) - Content: ${node.getText()}`);

        if (!this.supportsFunctions(node, ts)) {
          // console.debug("1. not support node:")
          return ts.visitEachChild(node, visit, context);
        }
        // console.debug("1. support node")
        let updatedNode = this.generateUpdatedNode(node, ts);
        return ts.visitEachChild(updatedNode, visit, context);
      };
      return (node) => ts.visitNode(node, visit);
    };
  }

  static supportsFunctions(node, ts) {
    const functionKinds = [
      ts.SyntaxKind.FunctionDeclaration,
      ts.SyntaxKind.MethodDeclaration,
      ts.SyntaxKind.FunctionExpression,
      ts.SyntaxKind.ArrowFunction,
      ts.SyntaxKind.GetAccessor,
      ts.SyntaxKind.SetAccessor
    ];
    return functionKinds.includes(node.kind);
  }

  static generateUpdatedStatements(node, ts) {
    const newStatements: Array<typeof ts.Statement> = [];

    // 插入方法开始点
    const beforeLogStatement = ts.factory.createExpressionStatement(
      ts.factory.createCallExpression(
        ts.factory.createIdentifier('console.log'),
        undefined,
        [ts.factory.createStringLiteral('Function start: ' + (node.name ? node.name.text : 'anonymous function'))]
      )
    );
    newStatements.push(beforeLogStatement);

    if (node.body && ts.isBlock(node.body)) {
      node.body.statements.forEach(statement => {
        if (ts.isReturnStatement(statement) || ts.isThrowStatement(statement)) {
          // 在 return 或 throw 之前插入 end 日志
          newStatements.push(
            ts.factory.createExpressionStatement(
              ts.factory.createCallExpression(
                ts.factory.createIdentifier('console.log'),
                undefined,
                [ts.factory.createStringLiteral('Function end: ' + (node.name ? node.name.text : 'anonymous function'))]
              )
            )
          );
          newStatements.push(statement);
        } else if (ts.isTryStatement(statement)) {
          // 针对 try 语句处理 catch 和 finally 块
          const tryBlock = ts.factory.updateBlock(
            statement.tryBlock,
            this.addLogsToStatements(statement.tryBlock.statements, ts, node)
          );

          const catchClause = statement.catchClause ? ts.factory.updateCatchClause(
            statement.catchClause,
            statement.catchClause.variableDeclaration,
            ts.factory.updateBlock(
              statement.catchClause.block,
              this.addLogsToStatements(statement.catchClause.block.statements, ts, node)
            )
          ) : undefined;

          const finallyBlock = statement.finallyBlock ? ts.factory.updateBlock(
            statement.finallyBlock,
            this.addLogsToStatements(statement.finallyBlock.statements, ts, node)
          ) : undefined;

          // 更新 try 语句
          newStatements.push(
            ts.factory.updateTryStatement(
              statement,
              tryBlock,
              catchClause,
              finallyBlock
            )
          );

        } else {
          newStatements.push(statement);
        }
      });

      // 如果没有 return 或 throw 语句，在块末尾插入结束日志
      if (!node.body.statements.some(s => ts.isReturnStatement(s) || ts.isThrowStatement(s))) {
        newStatements.push(
          ts.factory.createExpressionStatement(
            ts.factory.createCallExpression(
              ts.factory.createIdentifier('console.log'),
              undefined,
              [ts.factory.createStringLiteral('Function end: ' + (node.name ? node.name.text : 'anonymous function'))]
            )
          )
        );
      }
    }

    return newStatements;
  }

  static addLogsToStatements(statements, ts, node) {
    const updatedStatements: Array<typeof ts.Statement> = [];

    statements.forEach(statement => {
      if (ts.isReturnStatement(statement) || ts.isThrowStatement(statement)) {
        // 在 return 或 throw 之前添加日志
        updatedStatements.push(
          ts.factory.createExpressionStatement(
            ts.factory.createCallExpression(
              ts.factory.createIdentifier('console.log'),
              undefined,
              [ts.factory.createStringLiteral('Function end: ' + (node && node.name ? node.name.text : 'anonymous function'))]
            )
          )
        );
      }

      if (ts.isTryStatement(statement)) {
        // 对嵌套的 try 块也进行处理
        const tryBlock = ts.factory.updateBlock(
          statement.tryBlock,
          this.addLogsToStatements(statement.tryBlock.statements, ts, node)
        );

        const catchClause = statement.catchClause ? ts.factory.updateCatchClause(
          statement.catchClause,
          statement.catchClause.variableDeclaration,
          ts.factory.updateBlock(
            statement.catchClause.block,
            this.addLogsToStatements(statement.catchClause.block.statements, ts, node)
          )
        ) : undefined;

        const finallyBlock = statement.finallyBlock ? ts.factory.updateBlock(
          statement.finallyBlock,
          this.addLogsToStatements(statement.finallyBlock.statements, ts, node)
        ) : undefined;

        // 更新嵌套的 try 语句
        updatedStatements.push(
          ts.factory.updateTryStatement(
            statement,
            tryBlock,
            catchClause,
            finallyBlock
          )
        );
      } else {
        updatedStatements.push(statement);
      }
    });
    return updatedStatements;
  }

  static generateFunctionDeclarationCode(node, ts) {
    const newStatements = SlowMethodTransform.generateUpdatedStatements(node, ts);
    return ts.factory.updateFunctionDeclaration(
      node,
      node.modifiers,
      node.asteriskToken,
      node.name,
      node.typeParameters,
      node.parameters,
      node.type,
      ts.factory.createBlock(newStatements, true)
    );
  }

  static generateMethodDeclarationCode(node, ts) {
    const newStatements = SlowMethodTransform.generateUpdatedStatements(node, ts);
    return ts.factory.updateMethodDeclaration(
      node,
      node.decorators,
      node.modifiers,
      node.asteriskToken,
      node.name,
      node.questionToken,
      node.typeParameters,
      node.parameters,
      node.type,
      ts.factory.createBlock(newStatements, true)
    );
  }

  static generateFunctionExpressionCode(node, ts) {
    const newStatements = SlowMethodTransform.generateUpdatedStatements(node, ts);
    return ts.factory.updateFunctionExpression(
      node,
      node.modifiers,
      node.asteriskToken,
      node.name,
      node.typeParameters,
      node.parameters,
      node.type,
      ts.factory.createBlock(newStatements, true)
    );
  }

  static generateArrowFunctionCode(node, ts) {
    const newStatements = SlowMethodTransform.generateUpdatedStatements(node, ts);
    return ts.factory.updateArrowFunction(
      node,
      node.modifiers,
      node.typeParameters,
      node.parameters,
      node.type,
      node.equalsGreaterThanToken,
      ts.factory.createBlock(newStatements, true)
    );
  }

  static generateGetAccessorDeclarationCode(node, ts) {
    const newStatements = SlowMethodTransform.generateUpdatedStatements(node, ts);
    return ts.factory.updateGetAccessorDeclaration(
      node,
      node.decorators,
      node.modifiers,
      node.name,
      node.parameters,
      ts.factory.createBlock(newStatements, true)
    );
  }

  static generateSetAccessorDeclarationCode(node, ts) {
    const newStatements = SlowMethodTransform.generateUpdatedStatements(node, ts);
    return ts.factory.updateSetAccessorDeclaration(
      node,
      node.decorators,
      node.modifiers,
      node.name,
      node.parameters,
      ts.factory.createBlock(newStatements, true)
    );
  }

  static generatePropertyAssignmentCode(node, ts) {
    if (ts.isFunctionExpression(node.initializer)) {
      const updatedFunction = SlowMethodTransform.generateFunctionExpressionCode(node.initializer, ts);
      return ts.factory.updatePropertyAssignment(
        node,
        node.name,
        updatedFunction
      );
    } else if (ts.isArrowFunction(node.initializer)) {
      const updatedFunction = SlowMethodTransform.generateArrowFunctionCode(node.initializer, ts);
      return ts.factory.updatePropertyAssignment(
        node,
        node.name,
        updatedFunction
      );
    }
    return node;
  }

  static generateUpdatedNode(node, ts) {
    const nodeKindName = getNodeKindName(ts, node.kind);
    console.log(`Visiting node: ${nodeKindName} (kind: ${node.kind}) - Content: ${node.getText()}`);

    if (ts.isFunctionDeclaration(node)) {
      return SlowMethodTransform.generateFunctionDeclarationCode(node, ts);
    } else if (ts.isFunctionExpression(node)) {
      return SlowMethodTransform.generateFunctionExpressionCode(node, ts);
    } else if (ts.isMethodDeclaration(node)) {
      return SlowMethodTransform.generateMethodDeclarationCode(node, ts);
    } else if (ts.isGetAccessorDeclaration(node)) {
      return SlowMethodTransform.generateGetAccessorDeclarationCode(node, ts);
    } else if (ts.isSetAccessorDeclaration(node)) {
      return SlowMethodTransform.generateSetAccessorDeclarationCode(node, ts);
    } else if (ts.isArrowFunction(node)) {
      return SlowMethodTransform.generateArrowFunctionCode(node, ts);
    } else if (ts.isPropertyAssignment(node)) {
      return SlowMethodTransform.generatePropertyAssignmentCode(node, ts);
    }
    return node;
  }
}

