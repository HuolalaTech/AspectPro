
export class YourEmptyAop {
  /**
   * 1.此方法必须按下述格式实现
   * @param ts         (鸿蒙ets_loader中的ts对象)
   * @param sourcefile (鸿蒙ets_loader处理后的 ts sourcefile对象)
   * @param modulePath (当前工程路径)
   * @returns          (鸿蒙ets_loader中的ts对象)
   */
  static doTransform(ts, sourcefile, modulePath: string) {
    return sourcefile;
  }
}

// 2.必须导出, plugin 内部使用require方式import
//@ts-ignore
module.exports = YourEmptyAop;


