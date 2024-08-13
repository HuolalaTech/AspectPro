export interface AspectProHookOptions {
  target: any; // 目标类
  methodNameOrProperty: string; // 方法|属性名
  propertyMethodNameOrType?: string; // 子方法|子属性名
  hookMethodAction?: boolean; // 是否hook方法参数方法(适用于:方法被hook方法第一个参数为function)
  beforeFn?: (context: any, args: any[]) => void; // 方法执行前勾子函数
  afterFn?: (context: any, args: any[], result: any) => void; // 方法执行后勾子函数
}