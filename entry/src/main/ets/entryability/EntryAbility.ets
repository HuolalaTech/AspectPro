import { AbilityConstant, UIAbility, Want } from '@kit.AbilityKit';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { Router, window } from '@kit.ArkUI';
import { Logger } from '@huolala/logger';
import { TAG, testHookHttpClientBuild } from '../MyHookManager';
import { TestClass1 } from '../test/TestClass1';
import AspectPro from '@huolala/aspectpro';

export default class EntryAbility extends UIAbility {
  onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {

    /**
     * 用法一: 对齐系统的 addBefore、addAfter、replace
     */
    AspectPro.addBefore(Button, "onClick", () => {
      Logger.w(TAG, "1.AspectPro add before ---- Button#onClick()#action ，do your business ...");
    }, true)

    AspectPro.addAfter(TestClass1, "b", () => {
      Logger.w(TAG, "1.AspectPro add after ---- TestClass1#b() ，do your business ...");
    })


    AspectPro.replace(TestClass1, "c", (origin:Function, ...args:object[]) => {

      let changedArgs = [...args]
      changedArgs[0]  = new String("change param 123456")

      const result:string = origin(...changedArgs)

      Logger.w(TAG, "1.AspectPro replace ---- TestClass1#c() ，do your business ..."
        + "result:"  + result);
      return result
    })

    let newResult = new TestClass1().c("test 1234")

    Logger.w(TAG, "newResult ..." + newResult);

    /**
     * 用法二: 统一hook api
     */
    // 2.hook router#pushUrl()
    AspectPro.hookMethod({
      target: Router,
      methodNameOrProperty: 'pushUrl',
      beforeFn: () => {
        Logger.w(TAG, "AspectPro hookedMethod-> before ---- Router#pushUrl() ，do your business ...");
      }
    })

    // 3.hook TestClass1#a()
    AspectPro.hookMethod({
      target: TestClass1,
      methodNameOrProperty: 'a',
      afterFn: () => {
        Logger.w(TAG, "AspectPro hookedMethod-> afterFn ---- TestClass1#a() ，do your business ...");
      }
    })

    // 4.hook httpClient method
    testHookHttpClientBuild()

  }

  onWindowStageCreate(windowStage: window.WindowStage): void {

    windowStage.loadContent('pages/Index', (err) => {
      if (err.code) {
        hilog.error(0x0000, 'testTag', 'Failed to load the content. Cause: %{public}s', JSON.stringify(err) ?? '');
        return;
      }
    });
  }
}
