// import * as ts from 'typescript'  不能使用原生ts模块 必须从sdk中取
//@ts-ignore
import path from 'path';
import { PluginConfigManager } from '../configs/PluginConfigManager';
import { SlowMethodPlugin } from './slowMethod/SlowMethodPlugin';

function doTransform() {
  return {
    name: 'doTransform',
    beforeBuildEnd(this: any) {
      /**
       * 1.获取配置文件
       * 2.获取ets_loader中的 ts对象
       * 3.获取this.share & sourcefile
       * 4.将sourcefile分发给 aopPluginImp 进行插桩
       * 5.将修改后sourcefile赋值给this.share.sourcefile
       */
      let allSlowMethodFiles: string[] =
        PluginConfigManager.parseSlowMethodConfig(this.share.projectConfig.modulePath, '../local_plugin/src/main/configs/txt/slowMethodBlacklist.txt');
      console.log("beforeBuildEnd() ----> allSlowMethodFiles: " + allSlowMethodFiles.length);
      if (allSlowMethodFiles.length <= 0) {
        console.error("doTransform() ----> allSlowMethodFiles: " + allSlowMethodFiles.length);
        return;
      }

      //@ts-ignore
      let ts = require(path.join(this.share.projectConfig.etsLoaderPath, 'node_modules', 'typescript'));
      let modulePath = this.share.projectConfig.modulePath;
      // 获取所有的 SourceFile  这里拿到的sourceFiles数据 实际上是包装了一层 原始的sourceFile在.source中
      const sourceFiles = this.share.getSourceFiles();
      // console.log("beforeBuildEnd() ----> this.share 类型: " + typeof this.share);
      // console.dir(this.share);
      console.log("beforeBuildEnd() ----> sourceFiles 长度: " +  sourceFiles.length);
      // console.dir(sourceFiles);
      // 遍历所有的sourceFile
      sourceFiles.forEach((ModuleSourceFile) => {
        // 使用 ts.transform 来应用转换，并获取转换上下文
        // let result = ts.transform(ModuleSourceFile.source, [createTransformerClass(ts), createTransformerFunction(ts)]);
        // // result = ts.transform(result, [createTransformerFunction(ts)]);
        // const printer = ts.createPrinter();
        // const code = printer.printFile(result.transformed[0]);
        // // console.log("code:"+code);
        //
        // ModuleSourceFile.source = result.transformed[0];
        ModuleSourceFile.source = SlowMethodPlugin.doTransform(ts, ModuleSourceFile.source, modulePath)
      });
    },
  };
}

// 创建转换器工厂
function createTransformerClass(ts) {
  return (context) => {
    return (node) => visitClassNode(node, context, ts);
  };
}

function createTransformerFunction(ts) {
  return (context) => {
    return (node) => visitFunctionNode(node, context, ts);
  };
}

// 递归遍历AST中的所有节点 插装具体逻辑 示例是找到所有带有@ClassDes注解的类，在类中添加一个最基础的静态方法
function visitClassNode(node, context, ts) {
  if (ts.isClassDeclaration(node)) {
    const decoratorName = 'ClassDes';
    // 查找类上是否有目标装饰器
    //@ts-ignore
    const hasDecorator = node.modifiers?.some((modifier) => {
      if (modifier?.expression?.escapedText) {
        console.log(modifier.expression.escapedText);
        if (ts.isIdentifier(modifier.expression)) {
          return modifier.expression.escapedText === decoratorName;
        }
      }
      return false;
    });

    // 如果类上有指定的装饰器，添加静态方法
    if (hasDecorator) {
      const staticMethod = context.factory.createMethodDeclaration(
        [context.factory.createToken(ts.SyntaxKind.StaticKeyword)], // 静态方法修饰符
        undefined,
        'myStaticMethod', // 方法名
        undefined,
        undefined,
        [],
        undefined,
        context.factory.createBlock([
          context.factory.createExpressionStatement(
            context.factory.createCallExpression(context.factory.createIdentifier('console.log'), undefined, [
              context.factory.createStringLiteral('Static method called!'),
            ]),
          ),
        ]),
      );

      // 创建新的修饰符（包括装饰器）
      const newModifiers = [
        ...(node.modifiers || []), // 继承现有修饰符
        ...(node.decorators?.map(
          (decorator) => ts.factory.createDecorator(decorator.expression), // 将装饰器移到修饰符中
        ) || []),
      ];

      // 返回修改后的类节点
      return context.factory.updateClassDeclaration(
        node,
        newModifiers, // 将新的修饰符作为参数
        node.name,
        node.typeParameters,
        node.heritageClauses,
        [...node.members, staticMethod], // 在类的成员中添加静态方法
      );
    }
  }
  // 递归遍历子节点
  return ts.visitEachChild(node, (childNode) => visitClassNode(childNode, context, ts), context);
}

// 递归遍历AST中的所有节点 插装具体逻辑 示例是找到所有带有@FunctionTest注解的方法，在调用前添加一段逻辑 如果要在之后添加逻辑 需要处理代码中可能存在的return逻辑
function visitFunctionNode(node, context, ts) {
  if (ts.isMethodDeclaration(node)) {
    const decoratorName = 'FunctionTest';
    // 查找类上是否有目标装饰器
    //@ts-ignore
    const hasDecorator = node.modifiers?.some((modifier) => {
      if (modifier?.expression?.escapedText) {
        console.log(modifier.expression.escapedText);
        if (ts.isIdentifier(modifier.expression)) {
          return modifier.expression.escapedText === decoratorName;
        }
      }
      return false;
    });

    // 如果类上有指定的装饰器，在调用前添加一段逻辑
    if (hasDecorator) {
      const methodBody = node.body ? node.body.statements : [];

      const newMethodBody = ts.factory.createBlock([
      // 在方法开始前添加逻辑
        ts.factory.createExpressionStatement(ts.factory.createCallExpression(
          ts.factory.createIdentifier('console.log'),
          undefined,
          [ts.factory.createStringLiteral('Before test execution')]
        )),
        ...node.body?.statements || [], // 保持原始方法体
      ], true);

      // 更新原方法体
      return ts.factory.updateMethodDeclaration(
        node,
        node.modifiers,
        node.name,
        node.questionToken,
        undefined,
        node.typeParameters,
        node.parameters,
        node.type,
        newMethodBody
      );
    }
  }
  // 递归遍历子节点
  return ts.visitEachChild(node, (childNode) => visitFunctionNode(childNode, context, ts), context);
}

export default doTransform();
