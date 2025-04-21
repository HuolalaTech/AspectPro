//@ts-ignore
import path from 'path';
import { DescriptorMethodAopImp } from './aops/DescriptorMethodAopImp';
import { PrivacyMethodAopImp } from './aops/PrivacyMethodAopImp';
import { ReplaceMethodAopImp } from './aops/ReplaceMethodAopImp';
import { SlowMethodAopImp } from './aops/SlowMethodAopImp';

/**
 * 背景：TS Compiler Api 无法处理ets文件 & Ets 语法解析api官方暂未开发
 *
 * 方案: 直接Hvigor plugin 中获取ets_loader 编译工具中this.share 对象，进而获取到 Ets转换后的 ts.sourcefile
 *
 *  工作流程
 * - step 1: ets_loader内部的ts对象
 * - step 2: 获取this.share.getSourceFiles()中的所有ModuleSourceFile对象
 * - step 3: 将sourcefile 分发给自定义的AopTransformers 处理
 * - step 4: 将处理后的updateSourcefile 赋值给ModuleSourceFile对象，系统继续编译生成产物
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
      //@ts-ignore
      let ts = require(path.join(this.share.projectConfig.etsLoaderPath, 'node_modules', 'typescript'));
      let modulePath = this.share.projectConfig.modulePath;
      const sourceFiles = this.share.getSourceFiles();
      sourceFiles.forEach((ModuleSourceFile) => {
        let updateSourcefile = ModuleSourceFile.source;

        if (!isValidSourceFile(updateSourcefile)) {
          return updateSourcefile;
        }

        // 按需依次处理：多个AOP插桩逻辑 (可简单理解为：Android apply plugin)
        updateSourcefile = SlowMethodAopImp.doTransform(ts, updateSourcefile, modulePath)
        updateSourcefile = ReplaceMethodAopImp.doTransform(ts, updateSourcefile, modulePath)
        updateSourcefile = DescriptorMethodAopImp.doTransform(ts, updateSourcefile, modulePath)
        updateSourcefile = PrivacyMethodAopImp.doTransform(ts, updateSourcefile, modulePath)
        // ...
        ModuleSourceFile.source = updateSourcefile;
      });
    },
  };

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
