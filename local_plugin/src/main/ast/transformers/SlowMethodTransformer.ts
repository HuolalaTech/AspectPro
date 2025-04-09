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

export function startSlowMethodTransformer(tsSourceFile: ts.SourceFile, filePath: string) {
  const transformedSourceFile = applyTransform(tsSourceFile, updateMethodVisitor, filePath);
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

function updateMethodVisitor(context: ts.TransformationContext, filePath: string): ts.Visitor {
  return function visit(node: ts.Node): ts.VisitResult<ts.Node> {
    if (!supportsFunctions(node)) {
      return ts.visitEachChild(node, (childNode) => visit(childNode), context);
    }
    if (node.body && isMethodSimpleOrEmpty(node.body.statements)) {
      return ts.visitEachChild(node, (childNode) => visit(childNode), context);
    }
    // 递归Node-支持函数嵌套
    let recursionNode: ts.Node;

    if (ts.isFunctionDeclaration(node)) {
      recursionNode = generateFunctionDeclarationCode(node, filePath);
    } else if (ts.isFunctionExpression(node)) {
      recursionNode = generateFunctionExpressionCode(node, filePath);
    } else if (ts.isMethodDeclaration(node)) {
      recursionNode = generateMethodDeclarationCode(node, filePath);
    } else if (ts.isGetAccessorDeclaration(node)) {
      recursionNode = generateGetAccessorDeclarationCode(node, filePath);
    } else if (ts.isArrowFunction(node)) {
      recursionNode = generateArrowFunctionCode(node, filePath);
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
