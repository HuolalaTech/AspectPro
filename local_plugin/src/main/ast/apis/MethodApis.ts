/*
//@ts-ignore
import * as ts from 'typescript';
import { generateMethodID } from '../../utils/MethodIdUtil';
import { setShouldImport } from '../transformers/SlowMethodTransformer';

export function supportsFunctions(node: ts.Node) {
  return ts.isFunctionDeclaration(node)
    || ts.isFunctionExpression(node)
    || ts.isMethodDeclaration(node)
    || ts.isGetAccessorDeclaration(node)
    || ts.isArrowFunction(node);
}

export function isMethodSimpleOrEmpty(statements: ts.NodeArray<ts.Statement>): boolean {
  // 1.过滤空函数
  if (statements.length === 0) {
    return true;
  }
  // 2.过滤单纯throw的函数
  if (statements.every(statement => ts.isThrowStatement(statement))) {
    return true;
  }
  // 3.过滤set、get函数
  if (statements.length === 1 &&
    (ts.isGetAccessorDeclaration(statements[0]) || ts.isSetAccessorDeclaration(statements[0]))) {
    return true;
  }
  // 4.过滤直接return的函数
  if (statements.length === 1 && ts.isReturnStatement(statements[0])) {
    return true;
  }
  return false;
}

*/
/**
 * 生成插入后 newStatements -> 进一步生成 node.body -> 实现代码插桩
 * 比如:
 *    原始 -> function xxx() { let a = 1}
 *    生成 -> function xxx() {
 *                            A.i(methodId);
 *                            let a = 1
 *                            A.o(methodId);
 *                           }
 *//*

export function generateUpdatedStatements(node:
ts.FunctionDeclaration
  | ts.FunctionExpression
  | ts.MethodDeclaration
  | ts.GetAccessorDeclaration
  | ts.ArrowFunction): ts.Statement[] {
  const newStatements: ts.Statement[] = [];
  // 1.生成methodId
  let methodId = generateMethodID(node)

  // 2.插入方法开始点
  newStatements.push(
    ts.factory.createExpressionStatement(
      ts.factory.createCallExpression(
        ts.factory.createIdentifier('ApmMethodMonitor.i'),
        undefined,
        [ts.factory.createStringLiteral(methodId)]
      )
    )
  );

  // 3.如果有return或者throw ,则在这之前插入结束点
  if (node.body && ts.isBlock(node.body)) {
    node.body.statements.forEach(statement => {
      newStatements.push(statement);
      if (ts.isReturnStatement(statement) || ts.isThrowStatement(statement)) {
        newStatements.splice(newStatements.length - 1, 0,
          ts.factory.createExpressionStatement(
            ts.factory.createCallExpression(
              ts.factory.createIdentifier('ApmMethodMonitor.o'),
              undefined,
              [ts.factory.createStringLiteral(methodId)]
              // createNumericLiteral
            )
          )
        );
      }
    });
  }

  // 4.没有return或者throw ,则在方法最后插入结束点
  if (!newStatements.some(stmt => ts.isReturnStatement(stmt) || ts.isThrowStatement(stmt))) {
    newStatements.push(
      ts.factory.createExpressionStatement(
        ts.factory.createCallExpression(
          ts.factory.createIdentifier('ApmMethodMonitor.o'),
          undefined,
          [ts.factory.createStringLiteral(methodId)]
        )
      )
    );
  }  else {
    // 处理非 Block 的情况
    newStatements.push(
      ts.factory.createExpressionStatement(
        ts.factory.createCallExpression(
          ts.factory.createIdentifier('ApmMethodMonitor.o'),
          undefined,
          [ts.factory.createStringLiteral(methodId)]
        )
      )
    );
  }

  // 5.设置需要导包
  setShouldImport()

  return newStatements;
}

*/
/**
 * 函数声明类型
 * function xxx() {}
 *//*

export function generateFunctionDeclarationCode(node: ts.FunctionDeclaration): ts.FunctionDeclaration {
  const newStatements = generateUpdatedStatements(node);
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

*/
/**
 * 函数表达式类型
 * let fa = function xxx() {}
 *//*

export function generateFunctionExpressionCode(node: ts.FunctionExpression): ts.FunctionExpression {
  const newStatements = generateUpdatedStatements(node);
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

*/
/**
 * 方法声明类型
 * class A {
 *    a():void {}
 *  }
 *//*

export function generateMethodDeclarationCode(node: ts.MethodDeclaration): ts.MethodDeclaration {
  const newStatements = generateUpdatedStatements(node);
  return ts.factory.updateMethodDeclaration(
    node,
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

*/
/**
 * 静态方法声明类型
 * class A {
 *    static b():void {}
 *  }
 *//*

export function generateGetAccessorDeclarationCode(node: ts.GetAccessorDeclaration): ts.GetAccessorDeclaration {
  const newStatements = generateUpdatedStatements(node);
  return ts.factory.updateGetAccessorDeclaration(
    node,
    node.modifiers,
    node.name,
    node.parameters,
    node.type,
    ts.factory.createBlock(newStatements, true)
  );
}

*/
/**
 * 箭头函数类型
 * const xxx = () => {}
 *//*

export function generateArrowFunctionCode(node: ts.ArrowFunction): ts.ArrowFunction {
  const newStatements = generateUpdatedStatements(node);
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

*/
/**
 * 收集单个文件所有的方法
 *//*

function collectMethods(node: ts.Node, methods: ts.FunctionLikeDeclaration[] = []): ts.FunctionLikeDeclaration[] {
  if (ts.isMethodDeclaration(node) || ts.isFunctionDeclaration(node)
    || ts.isFunctionExpression(node) || ts.isArrowFunction(node)) {
    methods.push(node);
  }
  ts.forEachChild(node, child => {
    collectMethods(child, methods);
  });
  return methods;
}*/
