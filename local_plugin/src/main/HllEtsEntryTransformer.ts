/**
 * @deprecated
 *
 * 背景：TS Compiler Api 无法处理ets文件 & Ets 语法解析api官方暂未开发
 *
 * 方案: 修改ets_loader 编译工具，插入业务自定义transform
 *
 * (源码路径：/Applications/DevEco-Studio.app/Contents/sdk/default/openharmony/ets/build-tools/ets-loader/rollup-plugin-ets-typescript.js)
 *
 *  工作流程
 * - step 1: 定义自定义的doTransform方法 & 导出 HllEtsEntryTransformer
 * - step 2: 将HllEtsEntryTransformer 插入到 ets_loader#transform(e,t) 函数的_process_ui_syntax.processUISyntax 之后
 *       -2.1 hllTransformInstance = require('/Users/greek.chen/HarmonyOs/openSource/AspectPro/local_plugin/src/main/HllEtsEntryTransformer.ts').default
 *       -2.2 hllTransformInstance.doTransform(_typescript, t, c)
 * - step 3: 拿到_process_ui_syntax.processUISyntax transform处理之后的sourcefile， 使用TS Compiler Api 进行 ast Aop操作并返回
 *
 */

//@ts-ignore
import * as ts from 'typescript';

/**
 * 注意：仅编译要插桩的项目时开启， 避免影响所有项目 (修改编译工具)
 */
const openHllTransformer:boolean = true;

class HllEtsEntryTransformer {
  constructor() {
  }

  /**
   *
   * @param ts ets_loader中的ts对象
   * @param t 原始文件(ets|ts|js)
   * @param c t.mate
   * @returns 修改后的 sourcefile
   */
  doTransform(ts, t, c) {

    if (!openHllTransformer) {
      return (sourceFile) => {
        return sourceFile;
      };
    }
    return (context:ts.TransformationContext) => {
      return (sourceFile) => {
        // console.warn('hllEtsTransformer', 'ts:', ts);
        // console.warn('hllEtsTransformer', 'context:', context);
        console.warn('hllEtsTransformer', 'sourceFile.filaName:', sourceFile.fileName);
        console.warn('hllEtsTransformer', 't:', t);
        // console.warn('hllEtsTransformer', 'c:', c);
        return sourceFile;
      };
    };
  }
}

const hllTransformInstance = new HllEtsEntryTransformer()
export default hllTransformInstance;





