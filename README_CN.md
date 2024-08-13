# <center>AspectPro</center>

-------------------------------------------------------------------------------
**[中文文档](README_CN.md)** ｜ **[Introduction](README.md)**

## 简介

`AspectPro`是一款轻量级的鸿蒙运行时hook框架(配合aspectProPlugin可实现任意代码hook)。

* **1.对齐鸿蒙系统的Aspect能力**
* **2.简化使用姿势，无需关心是否为静态方法**
* **3.支持Hook 方法的行为 (如Button的onClick事件)**
* **4.支持Hook 方法内部class的方法 (如HttpClient.Builder().build())**
* **5.支持Hook writeable为false的方法需配合aspect-pro-plugin使用 (如router.pushUrl)**
* **6.支持Hook 方法并改变参数、返回值**

`aspect-pro-plugin`是一款轻量级的鸿蒙编译时代码修改框架。

* **1.支持扫描指定文件夹｜文件 ：-hook xxx**
* **2.支持keep指定文件夹｜文件 ：-keep xxx**
* **3.支持替换-hook文件夹｜文件下指定代码 ：-replace xxx to yyy (xxx为替换前代码 yyy替换后代码)**
* **4.支持replace时自动导包 -replace xxx to yyy [import xxx import bbb]**
* **5.支持扩展(aspectProPluginHvigorfileCode 是plugin源码, 重命名为hvigorfile即可本地开发)**
* **6.支持自定义配置规则 (参考aspectProPluginConfig.txt)**

-------------------------------------------------------------------------------

## 下载安装

```shell
**Har 依赖**
ohpm i @huolala/aspectpro

**Plugin 依赖<optional>**
1.添加插件依赖,在工程的hvigor/hvigor-config.json5文件中配置
"dependencies": {
    "aspect-pro-plugin": "0.0.7"
  }
  
2.使用插件在entry或其他模块的 hvigorfile.ts文件中添加
import { aspectProPlugin } from 'aspect-pro-plugin';
export default {
  system: appTasks, 
  plugins: [aspectProPlugin()]
}

3.创建插件配置文件 aspectProPluginConfig.txt 和第二步目录保持一致即可
# 配置规则 
  -hook path | file : 配置需要被hook的文件/文件夹 <相对路径>
  -keep path | file : 配置需要keep的文件/文件夹 <相对路径>
  -replace pattern replacement [import xxx import xxx] : 配置需要替换的代码,花括号是配置自动导包

# 示例:
  -hook ./src/main/ets/
  -keep ./src/main/ets/hook/
  -replace router.pushUrl this.getUIContext().getRouter().pushUrl
  #-replace router.pushUrl this.getUIContext().getRouter().pushUrl [import { Logger } from '@huolala/logger';]

#支持三方库
  -hook ./oh_modules/@hll-wp/foundation/src/main/com.wp.foundation/utils/WPFUtil.js
  -replace IdUtils.next IdUtils.uuid
```

OpenHarmony ohpm
环境配置等更多内容，请参考[如何安装 OpenHarmony ohpm 包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md)

## 使用说明

**1. 引入依赖**

 ```
   import AspectPro from '@hll-wp/aspectpro'
 ```

**2. 使用介绍**

* **2.1 Basic Hook**

```
   AspectPro.addBefore(TestClass1, "a", () => {
            Logger.w(TAG, "1.AspectPro add before ---- TestClass1#a() ，do your business ...");
        })
        
   AspectPro.addAfter(TestClass1, "b", () => {
            Logger.w(TAG, "1.AspectPro add after ---- TestClass1#b() ，do your business ...");
        })

   AspectPro.replace(TestClass1, "c", (origin:Function, ...args:object[]) => {
      // 1.change params
      let changedArgs = [...args]
      changedArgs[0]  = new String("change param 1")

      // 2.invoke origin method
      const result:string = origin(...changedArgs)

      Logger.w(TAG, "1.AspectPro replace ---- TestClass1#c() ，do your business ..."
        + "result:"  + result);
      // 3.change origin method return
      return result
    })

    let newResult = new TestClass1().c("1234")

    Logger.w(TAG, "newResult ..." + newResult);
    
```

* **2.2 hook Method Actions**

```
     AspectPro.addBefore(Button, "onClick", () => {
            Logger.w(TAG, "1.AspectPro add before ---- Button#onClick()#action ，do your business ...");
        }, true)
```

* **2.3 Hooking Third Sdk Method **

```
    AspectPro.hookMethod({
            target: IdUtils,
            methodNameOrProperty: 'uuid',
            afterFn: () => {
                Logger.w(TAG, "1.AspectPro hookedMethod-> afterFn ---- IdUtils#uuid() ，do your business ...");
            }
        })
```

* **2.4 hook nested Method**

```
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

```

* **2.5 hook Methods with (Writable = False)**

```
    AspectPro.addBefore(Router, "pushUrl", () => {
      Logger.w(TAG, "1. AspectPro-> before ---- Router#pushUrl() ，just log ...");
    })
    
     /**
     * Plugin Configuration Needed:
     * 1. add plugin in hvigor/hvigor-config.json5
      "dependencies": {
         "aspect-pro-plugin": "0.0.7"
       }
     *  
     * 2.add in entry's hvigorfile.ts 
      import { aspectProPlugin } from 'aspect-pro-plugin';
      export default {
           system: appTasks, /* Built-in plugin of Hvigor. It cannot be modified. */
           plugins: [aspectProPlugin()]
       }
     * 
     * 3.Create a new aspectProPluginConfig.txt in the entry's
      -replace router.pushUrl this.getUIContext().getRouter().pushUrl
     */

```





