# <center>AspectPro Aop Plugin</center>

-------------------------------------------------------------------------------
**[中文文档](README_CN.md)** ｜ **[Introduction](README.md)**

## 简介

`aspect-pro-plugin`是一款轻量级的鸿蒙编译时AST AOP 插件。

* **1.3分钟即可快速支持鸿蒙编译时aop插桩能力**
* **2.支持ets、ts、js 语法解析 & aop插桩**
* **3.支持自定义配置规则 (参考aspectProPluginConfig.txt)**
* **4.支持replace自动导包**
* **5.丰富插桩demo示例 (函数耗时、函数替换、隐私函数调用检测、装饰器函数...)**

-------------------------------------------------------------------------------

## 3步集成Aop Plugin

```shell
1.添加并使用aspect-pro-plugin插件
  1.1 在工程hvigor-package.json文件中添加
"dependencies": {
    "aspect-pro-plugin": "2.0.0"
  }
  1.2 在entry或其他模块的 hvigorfile.ts文件中使用
import { aspectProPluginV2 } from 'aspect-pro-plugin';
export default {
  system: hapTasks, /* Built-in plugin of Hvigor. It cannot be modified. */
  plugins: [aspectProPluginV2(require.resolve('aspect-pro-plugin'))]
}

2.在工程目录下创建aop/aopConfig.json文件, 配置你的aop实现类绝对路径
{
  "aopConfigs": [
    {
      "name": "YourSlowMethodAop",
      "path": "/Users/xxx/HarmonyOs/openSource/AspectPro/entry/src/main/yourAop/YourSlowMethodAop.ts"
    },
    {
      "name": "YourEmptyAop",
      "path": "/Users/xxx/HarmonyOs/openSource/AspectPro/entry/src/main/yourAop/YourEmptyAop.ts"
    }
  ]
}

3.在你的YourSlowMethodAop.ts这个实现 doTransform()方法实现你的aop插桩逻辑并导出
export class YourSlowMethodAop {
  /**
   * 3.1 此方法必须按下述格式实现
   * @param ts         鸿蒙ets_loader中的ts对象
   * @param sourcefile 鸿蒙ets_loader处理后的 ts sourcefile对象
   * @param modulePath 当前工程路径
   * @returns          sourcefile
   */
  static doTransform(ts, sourcefile, modulePath: string) {
    try {
      // TOOD 实现你的插桩逻辑
      if (sourcefile.fileName.includes("EntryAbility.ets")) {
        console.log(`YourSlowMethodAop -> doTransform() ----> 开始处理目标文件:${sourcefile.fileName}`);
        let result = ts.transform(sourcefile, [YourSlowMethodTransform.doTransform(ts)]);
        return result.transformed[0];
      }
    } catch (e) {
      console.log(`YourSlowMethodAop -> doTransform()  exp:${e} ,sourcefile:${sourcefile.fileName}`);
    }
    return sourcefile;
  }
}

// 3.2 必须导出, plugin 内部使用require方式import
//@ts-ignore
module.exports = YourSlowMethodAop;
```








