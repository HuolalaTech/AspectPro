import { Logger } from '@huolala/logger/src/main/com.wp/Logger';
import { TAG } from '../AspectPro';
import { innerWrapMethod } from '../core/AspectProBase';

/**
 * Hook 特定方法
 *
 * @param target  目标类
 * @param action  方法名
 * @param beforeFn 调用被hook方法之前，执行的函数
 * @param afterFn  调用被hook方法之后，执行的函数
 */
export function innerHookMethod(target, action, beforeFn?, afterFn?): void {
  innerWrapMethod(target, action, (origin) => function (...args) {
    beforeFn?.apply(this, args);
    let result = origin.apply(this, args);
    afterFn?.apply(this, args);

    if (!beforeFn && !afterFn) {
      Logger.w(TAG, `hookMethod:${target + '->' + action}, but do nothing ,just log ???`)
    }
    return result;
  });
}
