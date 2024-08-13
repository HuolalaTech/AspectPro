import { Logger } from '@huolala/logger/src/main/com.wp/Logger';
import { TAG } from '../AspectPro';

/**
 * Hook 特定属性的方法
 *
 * @param target        目标类
 * @param propertyName  类属性名
 * @param methodName    方法名
 * @param beforeFn      调用被hook方法之前，执行的函数
 *
 * eg:
 * hookClassMethod(HttpClient,'Builder','build',(context, args) => {
 context._eventListeners = new HookedEventListener();
 }
 */
export function innerHookMethodProperty(
  target: any,
  propertyName: string,
  methodName: string,
  beforeFn?: (context: any, args: any[]) => void,
  afterFn?: (context: any, args: any[], result: any) => void) {
  const propertyDescriptor = Object.getOwnPropertyDescriptor(target, propertyName);
  if (propertyDescriptor && propertyDescriptor.get) {
    Object.defineProperty(target, propertyName, {
      get() {
        const originTarget = propertyDescriptor.get!.call(this);
        const originMethod = originTarget.prototype[methodName];

        originTarget.prototype[methodName] = function (...args: any[]) {


          beforeFn?.call(this, this, args);

          let result = originMethod.apply(this, args);

          afterFn?.call(this, this, args, result);

          if (!beforeFn && !afterFn) {
            Logger.w(TAG,
              `hookMethodProperty()->${target.name}: Modified ${propertyName}.${methodName}() , but do nothing ,just log ???`);
          }

          return result;
        };

        return originTarget;
      }
    });
  } else {
    Logger.e(TAG, `hookMethodProperty()->Property ${propertyName} is not a getter on target class`);
  }
}
