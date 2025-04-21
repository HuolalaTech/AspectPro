import { DescriptorMethodTransform } from '../../ast/transformers/DescriptorMethodTransform';

/**
 * AOP编译时：对“自定义装饰器”的方法插桩
 */
export class DescriptorMethodAopImp {
  static doTransform(ts, sourcefile, modulePath: string) {
    // console.log("DescriptorMethodAopImp -> doTransform() ----> 开始处理目标文件: " + sourcefile.fileName)
    let result = ts.transform(sourcefile, [DescriptorMethodTransform.doTransform(ts)]);
    return result.transformed[0];
  }
}
