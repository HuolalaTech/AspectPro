/*
//@ts-ignore
import * as ts from 'typescript';
import { insertImportStatement } from '../apis/ImportApis';
import {
  generateArrowFunctionCode,
  generateFunctionDeclarationCode,
  generateFunctionExpressionCode,
  generateGetAccessorDeclarationCode,
  generateMethodDeclarationCode,
  isMethodSimpleOrEmpty,
  supportsFunctions
} from '../apis/MethodApis';
import { applyTransform } from '../apis/TransformerApis';

const importName = 'ApmMethodMonitor'
const importPath = '@huolala/aspectpro/src/main/com/wp/slowMethod/ApmMethodMonitor'
let shouldImport = false;

export function startSlowMethodTransformer(tsSourceFile: ts.SourceFile) {
  console.log("1.startSlowMethodTransformer ....")
  const transformedSourceFile = applyTransform(tsSourceFile, updateMethodVisitor);
  const finalSourceFile = updateImportVisitor(transformedSourceFile);
  resetShouldImport();
  return finalSourceFile;
}

export function setShouldImport() {
  if (shouldImport === true) {
    return
  }
  shouldImport = true
}

function updateMethodVisitor(context: ts.TransformationContext): ts.Visitor {
  return function visit(node: ts.Node): ts.VisitResult<ts.Node> {
    if (!supportsFunctions(node)) {
      return ts.visitEachChild(node, (childNode) => visit(childNode), context);
    }

    const functionNode = node as ts.FunctionLikeDeclarationBase;
    if (functionNode.body && ts.isBlock(functionNode.body)) {
      const blockBody = functionNode.body as ts.Block;
      if (isMethodSimpleOrEmpty(blockBody.statements)) {
        return ts.visitEachChild(node, (childNode) => visit(childNode), context);
      }
    }

    // 递归Node-支持函数嵌套
    let recursionNode: ts.Node;

    if (ts.isFunctionDeclaration(node)) {
      recursionNode = generateFunctionDeclarationCode(node as ts.FunctionDeclaration);
    } else if (ts.isFunctionExpression(node )) {
      recursionNode = generateFunctionExpressionCode(node as ts.FunctionExpression);
    } else if (ts.isMethodDeclaration(node)) {
      recursionNode = generateMethodDeclarationCode(node as ts.MethodDeclaration);
    } else if (ts.isGetAccessorDeclaration(node)) {
      recursionNode = generateGetAccessorDeclarationCode(node as ts.GetAccessorDeclaration);
    } else if (ts.isArrowFunction(node)) {
      recursionNode = generateArrowFunctionCode(node as ts.ArrowFunction);
    } else {
      return ts.visitEachChild(node, (childNode) => visit(childNode), context);
    }
    // 递归处理函数嵌套情况
    return ts.visitEachChild(recursionNode, (childNode) => visit(childNode), context);
  };
}

function updateImportVisitor(sourceFile: ts.SourceFile): ts.SourceFile {
  if (shouldImport) {
    sourceFile = insertImportStatement(sourceFile, importName, importPath);
  }
  return sourceFile;
}

function resetShouldImport() {
  shouldImport = false
}
*/
