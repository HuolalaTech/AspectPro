import { router } from '@kit.ArkUI';

@Entry
@Component
export struct Second {
  @State message: string = 'AopDemo';

  build() {
    RelativeContainer() {
      Text(this.message)
        .id('Second Page')
        .margin({ top: 20 })
        .fontSize(50)
        .fontWeight(FontWeight.Bold)
        .alignRules({
          middle: { anchor: '__container__', align: HorizontalAlign.Center }
        })

      Button() {
        Text("JumpByRouter").fontSize(20).fontWeight(FontWeight.Bold).fontColor(Color.White)
      }
      .type(ButtonType.Normal)
      .margin({ top: 100 })
      .alignRules({
        middle: { anchor: '__container__', align: HorizontalAlign.Center }
      })
      .width('60%')
      .height('6%')
      .onClick(() => {
        router.pushUrl({ url: "pages/Index" });
      })
    }
    .height('100%')
    .width('100%')
  }
}