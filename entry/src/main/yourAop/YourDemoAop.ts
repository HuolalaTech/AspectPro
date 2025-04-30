import { YourDemoTransform } from "./YourDemoTransform";

export class YourDemoAop {
  /**
   * 1.此方法必须按下述格式实现
   * @param ts         (鸿蒙ets_loader中的ts对象)
   * @param sourcefile (鸿蒙ets_loader处理后的 ts sourcefile对象)
   * @param modulePath (当前工程路径)
   * @returns          (鸿蒙ets_loader中的ts对象)
   * @see https://github.com/microsoft/TypeScript/blob/main/src/compiler/types.ts
   */
  static doTransform(ts, sourcefile, modulePath: string) {
    try {
      if (sourcefile.fileName.includes("EntryAbility.ets")) {
        console.log(`YourDemoAop -> doTransform() ----> 开始处理目标文件:${sourcefile.fileName}`);
        let result = ts.transform(sourcefile, [YourDemoTransform.doTransform(ts)]);
        return result.transformed[0];
      }
    } catch (e) {
      console.log(`YourDemoAop -> doTransform()  exp:${e} ,sourcefile:${sourcefile.fileName}`);
    }
    return sourcefile
  }
}

// 2.必须导出, plugin 内部使用require方式import
//@ts-ignore
module.exports = YourDemoAop;

