import { Logger } from '@huolala/logger/src/main/com.wp/Logger';
import { TAG } from '../AspectPro';
import { innerWrapMethod } from '../core/AspectProBase';

/**
 * Hook 特定方法的行为
 *
 * 要求：被Hook的方法第一个参数必须是function， 实际Hook的是回调函数。
 * 使用场景：通常用于UI点击事件监听
 * 比如：onClick(event: (event: ClickEvent) => void): T;  以ClickEvent对象作为参数的回调函数
 * 用途：hook监听所有Button按钮 “点击”事件， 此场景需要监听的“点击行为”事件，而非Button.OnClick函数本事。
 *
 * @param target  目标类
 * @param action  方法名
 * @param beforeFn 调用被hook方法之前，执行的函数
 * @param afterFn  调用被hook方法之后，执行的函数
 */
export function innerHookMethodAction(target, action, beforeFn?, afterFn?) {
  innerWrapMethod(target, action, (originalMethod) => function (callback) {
    const wrappedCallback = (...args) => {
      beforeFn?.apply(this, args);
      callback.apply(this, args);
      afterFn?.apply(this, args);
      if (!beforeFn && !afterFn) {
        Logger.w(TAG, `hookMethodAction()->${target + '->' + action}, but do nothing ,just log ???`)
      }
    };
    originalMethod.call(this, wrappedCallback);
  });
}

