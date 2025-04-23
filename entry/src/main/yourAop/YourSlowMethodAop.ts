import { YourSlowMethodTransform } from './YourSlowMethodTransform';

export class YourSlowMethodAop {
  /**
   * 1.此方法必须按下述格式实现
   * @param ts         (鸿蒙ets_loader中的ts对象)
   * @param sourcefile (鸿蒙ets_loader处理后的 ts sourcefile对象)
   * @param modulePath (当前工程路径)
   * @returns          (修改后的sourcefile)
   */
  static doTransform(ts, sourcefile, modulePath: string) {
    try {
      if (sourcefile.fileName.includes("EntryAbility.ets")) {
        console.log(`YourSlowMethodAop -> doTransform() ----> 开始处理目标文件:${sourcefile.fileName}`);
        let result = ts.transform(sourcefile, [YourSlowMethodTransform.doTransform(ts)]);
        return result.transformed[0];
      }
    } catch (e) {
      console.log(`YourSlowMethodAop -> doTransform()  exp:${e} ,sourcefile:${sourcefile.fileName}`);
    }
    return sourcefile;
  }
}

// 2.必须导出, plugin 内部使用require方式import
//@ts-ignore
module.exports = YourSlowMethodAop;


