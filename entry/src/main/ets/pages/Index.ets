import { TestClass1 } from '../test/TestClass1';
import { Logger } from '@huolala/logger';
import { TestHttpClient } from '../test/TestHttpClient';
import { TAG } from '../MyHookManager';
import { router } from '@kit.ArkUI';

@Entry
@Component
struct Index {
  @State message: string = 'AopDemo';

  build() {
    RelativeContainer() {
      Text(this.message)
        .id('HelloWorld')
        .margin({ top: 20 })
        .fontSize(50)
        .fontWeight(FontWeight.Bold)
        .alignRules({
          middle: { anchor: '__container__', align: HorizontalAlign.Center }
        })

      Button() {
        Text("Test_Btn_OnClick_Action_Hook").fontSize(20).fontWeight(FontWeight.Bold).fontColor(Color.White)
      }
      .type(ButtonType.Normal)
      .margin({ top: 100 })
      .alignRules({
        middle: { anchor: '__container__', align: HorizontalAlign.Center }
      })
      .width('80%')
      .height('6%')
      .onClick(() => {
        Logger.i(TAG, "1.Test_Btn_OnClick_Action_Hook Button clicked by user ...");
      })

      Button() {
        Text("Test_Normal_Method_Hook").fontSize(20).fontWeight(FontWeight.Bold).fontColor(Color.White)
      }
      .type(ButtonType.Normal)
      .margin({ top: 200 })
      .alignRules({
        middle: { anchor: '__container__', align: HorizontalAlign.Center }
      })
      .width('80%')
      .height('6%')
      .onClick(() => {
        TestClass1.a(() => {
        })
        new TestClass1().b("invoke method b", false)
        new TestClass1().c("invoke method c")
      })

      Button() {
        Text("Test_Router_Hook").fontSize(20).fontWeight(FontWeight.Bold).fontColor(Color.White)
      }
      .type(ButtonType.Normal)
      .margin({ top: 300 })
      .alignRules({
        middle: { anchor: '__container__', align: HorizontalAlign.Center }
      })
      .width('80%')
      .height('6%')
      .onClick(() => {
        router.pushUrl({ url: "pages/Second" });
      })

      Button() {
        Text("Test_HttpClient_Hook").fontSize(20).fontWeight(FontWeight.Bold).fontColor(Color.White)
      }
      .type(ButtonType.Normal)
      .margin({ top: 400 })
      .alignRules({
        middle: { anchor: '__container__', align: HorizontalAlign.Center }
      })
      .width('80%')
      .height('6%')
      .onClick(() => {
        TestHttpClient.testHttpGet()
      })
    }
    .height('100%')
    .width('100%')
  }
}