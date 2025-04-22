//@ts-ignore
import path from 'path';
//@ts-ignore
import * as fs from 'fs';

/**
 * 背景：TS Compiler Api 无法处理ets文件 & Ets 语法解析api官方暂未开发
 *
 * 方案: 直接Hvigor plugin 中获取ets_loader 编译工具中this.share 对象，进而获取到 Ets转换后的 ts.sourcefile
 *
 *  工作流程
 * - step 1: 加载业务方Aop实现类 (在你的工程目录下新建 /aop/aopConfig.json)
 * - step 2: ets_loader内部的ts对象
 * - step 3: 获取this.share.getSourceFiles()中的所有ModuleSourceFile对象
 * - step 4: 将sourcefile 分发给自定义的AopTransformers 处理
 * - step 5: 将处理后的updateSourcefile 赋值给ModuleSourceFile对象，系统继续编译生成产物
 *
 *  注意事项
 * - 1: 必须使用ets_loader内部的ts对象，不能用 import * as ts from 'typescript'
 * - 2: this.share.getSourceFiles()获取到的是ModuleSourceFile包装类, 需要使用 ModuleSourceFile.source 获取到 ts.sourcefile
 *
 */
function doTransform() {
  return {
    name: 'doTransform',
    beforeBuildEnd(this: any) {
      let modulePath = this.share.projectConfig.modulePath;

      // load your aop imps
      const configFilePath = path.resolve(modulePath, '../aop/aopConfig.json');
      if (!configFilePath) {
        return;
      }
      const configContent = fs.readFileSync(configFilePath, { encoding: "utf-8" });
      const aopConfigs = JSON.parse(configContent).aopConfigs;

      if (!aopConfigs) {
        return;
      }

      //@ts-ignore
      let ts = require(path.join(this.share.projectConfig.etsLoaderPath, 'node_modules', 'typescript'));
      const sourceFiles = this.share.getSourceFiles();

      sourceFiles.forEach((ModuleSourceFile) => {
        let updateSourcefile = ModuleSourceFile.source;

        if (!isValidSourceFile(updateSourcefile)) {
          return updateSourcefile;
        }

        updateSourcefile = realTransform(aopConfigs, updateSourcefile, ts, modulePath);

        ModuleSourceFile.source = updateSourcefile;
      });
    },
  };

  function realTransform(aopConfigs: any, updateSourcefile: any, ts: any, modulePath: any) {
    aopConfigs.forEach((config) => {
      //@ts-ignore
      const aopImpClass = require(config.path);
      if (aopImpClass && aopImpClass.doTransform) {
        updateSourcefile = aopImpClass.doTransform(ts, updateSourcefile, modulePath);
      } else {
        console.error(`HllCompilePlugin#doTransform()-> ERROR: ${config.name}.doTransform is not a function or undefined`);
      }
    });
    return updateSourcefile;
  }

  function isValidSourceFile(sourcefile) {
    if (sourcefile === undefined || sourcefile.fileName === undefined) {
      return false;
    }

    const fileName = sourcefile.fileName.toLowerCase();
    const validExtensions = ['.js', '.ts', '.ets'];

    const isFileValid = validExtensions.some(extension => fileName.endsWith(extension));
    return isFileValid;
  }
}

export default doTransform();
