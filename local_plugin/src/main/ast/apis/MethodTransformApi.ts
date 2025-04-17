/**
 * 函数Aop transform类
 */
export class MethodTransformApi {
  static supportsFunctions(node, ts) {
    const functionKinds = [
      ts.SyntaxKind.FunctionDeclaration,
      ts.SyntaxKind.MethodDeclaration,
      ts.SyntaxKind.FunctionExpression,
      ts.SyntaxKind.ArrowFunction,
    ];
    return functionKinds.includes(node.kind);
  }

  static generateMethodId(node, sourceFile, ts): string {
    const className = this.getClassName(node, ts);
    const methodName = node.name ? node.name.text : 'anonymous function';
    const position = sourceFile.getLineAndCharacterOfPosition(node.getStart());

    if (className === 'global_scope') {
      return `${methodName}.${position.line}`;
    } else {
      return `${className}.${methodName}_${position.line}`;
    }
  }

  static getClassName(node, ts): string {
    while (node) {
      if (ts.isClassDeclaration(node) && node.name) {
        return node.name.text;
      }
      node = node.parent;
    }
    return 'global_scope';
  }

  static isSimpleOrEmptyMethod(node, ts): boolean {
    if (node.body && ts.isBlock(node.body)) {
      const statements = node.body.statements;
      if (statements.length === 0) {
        return true;
      }
      if (statements.every(statement => ts.isThrowStatement(statement))) {
        return true;
      }
      if (statements.length === 1 &&
        (ts.isGetAccessorDeclaration(statements[0]) || ts.isSetAccessorDeclaration(statements[0]))) {
        return true;
      }
      if (statements.length === 1 && ts.isReturnStatement(statements[0])) {
        return true;
      }
    }
    return false;
  }

  static generateFunctionDeclarationCode(node, ts, newStatements) {
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

  static generateMethodDeclarationCode(node, ts, newStatements) {
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

  static generateFunctionExpressionCode(node, ts, newStatements) {
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

  static generateArrowFunctionCode(node, ts, newStatements) {
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

  static generatePropertyAssignmentCode(node, ts, newStatements) {
    return ts.factory.updatePropertyAssignment(
      node,
      node.name,
      newStatements
    );
  }
}