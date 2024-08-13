import { Logger } from '@huolala/logger/src/main/com.wp/Logger';
import { AspectProHookOptions } from './interface/AspectProHookOptions';
import { innerHookMethodAction } from './imp/AspectProActionImp';
import { innerHookMethod } from './imp/AspectProCommonImp';
import { innerWrapMethod } from './core/AspectProBase';
import { innerHookMethodProperty } from './imp/AspectProPropertyImp';


/**
 * 装饰器模式实现hook (对标系统的 util.Aspect.XXX)
 * @link https://developer.huawei.com/consumer/cn/doc/best-practices-V5/bpta-application-aspect-programming-design-V5
 *
 * 用法一：对齐系统的 addBefore、addAfter、replace
 *
        AspectPro.addBefore(Button, "onClick", () => {
            Logger.w(TAG, "1.AspectPro add before ---- Button#onClick()#action ，do your business ...");
        }, true)

        AspectPro.addAfter(TestClass1, "b", () => {
            Logger.w(TAG, "1.AspectPro add after ---- TestClass1#b() ，do your business ...");
        })

        AspectPro.replace(TestClass1, "c", () => {
            Logger.w(TAG, "1.AspectPro replace ---- TestClass1#c() ，do your business ...");
        })
 *
 * 用法二：统一hook api
 *
        AspectPro.hookMethod({
            target: Router,
            methodNameOrProperty: 'pushUrl',
            beforeFn: () => {
                Logger.w(TAG, "AspectPro hookedMethod-> before ---- Router#pushUrl() ，do your business ...");
            }
        })

        AspectPro.hookMethod({
            target: TestClass1,
            methodNameOrProperty: 'a',
            afterFn: () => {
                Logger.w(TAG, "AspectPro hookedMethod-> afterFn ---- TestClass1#a() ，do your business ...");
            }
        })

        AspectPro.hookMethod({
            target: IdUtils,
            methodNameOrProperty: 'uuid',
            afterFn: () => {
                Logger.w(TAG, "1.AspectPro hookedMethod-> afterFn ---- IdUtils#uuid() ，do your business ...");
            }
        })

        AspectPro.hookMethod({
            target: HttpClient,
            methodNameOrProperty: 'Builder',
            beforeFn: (context, args) => {
                const builderContext = context as InstanceType<typeof HttpClient.Builder>;
                builderContext._eventListeners = new MyEventListener();
                builderContext.addInterceptor(new MyInterceptor());
            },
            propertyMethodNameOrType: 'build'
        })

 *
 *
 */
export const TAG = "Aop_sdk"

export class AspectPro {
  static addBefore(target, action, fn, hookMethodAction: boolean = false): void {
    if (hookMethodAction) {
      innerHookMethodAction(target, action, fn, undefined)
    } else {
      innerHookMethod(target, action, fn, undefined)
    }
  }

  static addAfter(target, action, fn, hookMethodAction: boolean = false): void {
    if (hookMethodAction) {
      innerHookMethodAction(target, action, undefined, fn)
    } else {
      innerHookMethod(target, action, undefined, fn)
    }
  }

  static replace<T extends (origin: Function, ...args: any[]) => any>(target, action, fn: T): void {
    innerWrapMethod(target, action, (origin) => function (...args) {
      return fn.call(this, origin, args);
    });
  }

  static hookMethod(options: AspectProHookOptions): void {
    const { target, methodNameOrProperty, propertyMethodNameOrType, hookMethodAction, beforeFn, afterFn } = options;
    if (!target || !methodNameOrProperty) {
      Logger.e(TAG, `Invalid parameters for AspectPro#hookMethod`)
      return
    }
    if (hookMethodAction) {
      innerHookMethodAction(target, methodNameOrProperty, beforeFn, afterFn);
    } else if (propertyMethodNameOrType) {
      innerHookMethodProperty(target, methodNameOrProperty, propertyMethodNameOrType, beforeFn, afterFn);
    } else {
      innerHookMethod(target, methodNameOrProperty, beforeFn, afterFn);
    }
  }

  static hookMethod2(
    target: any,
    methodNameOrProperty: string,
    beforeFn?: (context: any, args: any[]) => void,
    afterFn?: (context: any, args: any[]) => void,
    propertyMethodNameOrType?: string,
    hookMethodAction: boolean = false
  ): void {

    AspectPro.hookMethod({
      target: target,
      methodNameOrProperty: methodNameOrProperty,
      beforeFn: beforeFn,
      afterFn: afterFn,
      propertyMethodNameOrType: propertyMethodNameOrType,
      hookMethodAction: hookMethodAction
    })
  }
}