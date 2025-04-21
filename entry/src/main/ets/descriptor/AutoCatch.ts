/**
 * 类装饰器，用于标记某个类，并执行一些操作。
 *
 * 装饰器适用于   : 小范围的标记配置
 * 配置文件适用于 : 大范围的标记配置 (比如：local_plugin/src/main/configs/txt/aspectProPluginConfig.txt)
 */
export function MyClassDescriptor(constructor: Function) {
}

/**
 * 自动添加catch
 * 使用姿势：
 * @AutoCatch
 * xxxMethod(a:number): string {
 let b = 100/a; // 这里可能会报错，因为a可能为0
 }
 *
 */
export function AutoCatch<T>(target: Object, key: string,
  descriptor: TypedPropertyDescriptor<(...args: any[]) => T>): TypedPropertyDescriptor<(...args: any[]) => T> {
  const originalMethod = descriptor.value!;

  descriptor.value = function (...args: any[]): T {
    try {
      console.log(`Calling ${target.constructor.name} method ${key} with arguments: ${args}`);
      return originalMethod.apply(this, args);
    } catch (e) {
      return getDefaultValue<T>();
    }
  };

  return descriptor;
}

function getDefaultValue<T>(): T {
  if (Array.isArray([] as unknown as T)) {
    return [] as unknown as T;
  }
  if (typeof ({} as T) === 'string') {
    return "" as unknown as T;
  }
  if (typeof ({} as T) === 'number') {
    return 0 as unknown as T;
  }
  if (typeof ({} as T) === 'boolean') {
    return false as unknown as T;
  }
  return {} as T; // default to empty object for other types
}