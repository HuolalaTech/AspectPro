import { ImportTransformApi } from '../apis/ImportTransformApi';

const MY_CLASS_DESCRIPTOR = "MyClassDescriptor"
const AUTO_CATCH_DESCRIPTOR = "AutoCatch"

const insertLogMethodName = 'Logger.w';
const insertLogTag = 'SlowMethod';
const importName = 'Logger'
const importPath = '@package:pkg_modules/.ohpm/@huolala+logger@1.0.0/pkg_modules/@huolala/logger/src/main/com.wp/Logger'

/**
 * AOP Transform : 修改“特定装饰器修饰”的方法
 * step 一:
 *  遍历遍历AST找到“特定装饰器修饰”的类
 * step 二:
 *  在类中查到“特定装饰器修饰”函数并修改 (本例子仅：增加日志)
 */
export class DescriptorMethodTransform {
  static doTransform(ts) {
    return (context) => {
      return (sourceFile) => {
        const visit = (node) => this.myVisitNode(ts, node, context);

        let updatedSourceFile = ts.visitNode(sourceFile, visit);
        return ImportTransformApi.addImportStatement(updatedSourceFile, ts, importName, importPath);
      };
    };
  }

  static myVisitNode(ts, node, context) {
    if (ts.isClassDeclaration(node) && this.hasDecorator(node, MY_CLASS_DESCRIPTOR, ts)) {
      // 遍历类的方法，查找是否有AUTO_CATCH_DESCRIPTOR装饰器的方法
      const newMembers =
        ts.factory.createNodeArray(node.members.map(member => this.aopWhenMethodDeclarationMatch(ts, member)));
      return ts.factory.updateClassDeclaration(
        node,
        node.modifiers,
        node.name,
        node.typeParameters,
        node.heritageClauses,
        newMembers
      );
    }
    return ts.visitEachChild(node, (childNode) => this.myVisitNode(ts, childNode, context), context);
  }

  static aopWhenMethodDeclarationMatch(ts, member) {
    if (ts.isMethodDeclaration(member)) {
      if (this.hasDecorator(member, AUTO_CATCH_DESCRIPTOR, ts)) {
        return this.addConsoleDebugStatement(ts, member);
      }
    }
    return member;
  }

  static hasDecorator(node, decoratorName, ts) {
    return node.modifiers && node.modifiers.some(modifier => {
      if ('expression' in modifier) {
        let expression = modifier.expression;
        if (ts.isCallExpression(modifier.expression)) {
          expression = modifier.expression.expression;
        }
        return ts.isIdentifier(expression) && expression.text === decoratorName;
      }
      return false;
    });
  }

  static addConsoleDebugStatement(ts, method) {
    const logStatement = ts.factory.createExpressionStatement(
      ts.factory.createCallExpression(
        ts.factory.createIdentifier(insertLogMethodName),
        undefined,
        [
          ts.factory.createStringLiteral(insertLogTag),
          ts.factory.createStringLiteral(`Calling method: ${method.name.getText()}`)
        ]
      )
    );

    const newMethodBody = ts.factory.updateBlock(method.body, [
      logStatement,
      ...method.body.statements
    ]);

    return ts.factory.updateMethodDeclaration(
      method,
      method.modifiers,
      method.asteriskToken,
      method.name,
      method.questionToken,
      method.typeParameters,
      method.parameters,
      method.type,
      newMethodBody
    );
  }
}




