# <center>AspectPro Aop Plugin</center>

-------------------------------------------------------------------------------
** **[Introduction](README.md) | [中文文档](README_CN.md)** ｜**

## Introduction

`aspect-pro-plugin`is a lightweight HarmonyOS compile-time AST AOP plugin。

* **1.Support HarmonyOS compile-time AOP instrumentation in just 3 minutes**
* **2.Supports ets, ts, js syntax parsing & AOP instrumentation**
* **3.Supports custom configuration rules (refer to aspectProPluginConfig.txt)**
* **4.Supports automatic import with replace feature**
* **5.Rich instrumentation demo examples (function timing, function replacement, privacy function call detection, decorator functions, etc.)**

-------------------------------------------------------------------------------

## 3 Steps to use Aop Plugin

```shell
1.Add and use the aspect-pro-plugin plugin 
  1.1 Add it to the project hvigor-package.json file
"dependencies": {
    "aspect-pro-plugin": "2.0.1"
  }
  1.2 Use it in the hvigorfile.ts file of the entry or other modules 
import { aspectProPluginV2 } from 'aspect-pro-plugin';
export default {
  system: hapTasks, /* Built-in plugin of Hvigor. It cannot be modified. */
  plugins: [aspectProPluginV2(require.resolve('aspect-pro-plugin'))]
}

2. Create an aop/aopConfig.json file in the project directory and configure the absolute path of your AOP implementation classes.
{
  "aopConfigs": [
    {
      "name": "YourSlowMethodAop",
      "path": "./src/main/yourAop/YourSlowMethodAop.ts"
    },
    {
      "name": "YourEmptyAop",
      "path": "/Users/xxx/HarmonyOs/openSource/AspectPro/entry/src/main/yourAop/YourEmptyAop.ts"
    }
  ]
}

3. Implement the doTransform() method in your YourSlowMethodAop.ts file and export your AOP instrumentation logic.
export class YourSlowMethodAop {
  /**
   * 3.1 This method must be implemented in the following format.
   * @param ts         ts object from HarmonyOS ets_loader
   * @param sourcefile ts sourcefile object processed by HarmonyOS ets_loader
   * @param modulePath current project path
   * @returns          sourcefile
   */
  static doTransform(ts, sourcefile, modulePath: string) {
    try {
      // TOOD Implement your instrumentation logic
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

// 3.2 Must be exported, used internally by the plugin through require
//@ts-ignore
module.exports = YourSlowMethodAop;
```






