# <center>AspectPro</center>

-------------------------------------------------------------------------------
**[中文文档](README_CN.md)** ｜ **[Introduction](README.md)**

## Introduction

`AspectPro` is a lightweight HarmonyOs runtime hook framework (with aspectProPlugin, any code hook can be implemented).

1. Aligns with HarmonyOS System Aspect Capabilities

2. Simplifies Usage without Concern for Static Methods

3. Supports Hooking Specific Method Actions (e.g., Button's onClick event)

4. Supports Hooking Methods inside Inner Classes (e.g., HttpClient.Builder().build())

5. Supports Hooking Methods with Writable set to False, requires aspect-pro-plugin (e.g., router.pushUrl)

6. Supports Runtime Batch Hooking

`aspect-pro-plugin` is a lightweight code modification framework during the compile time for HarmonyOS.

1. Supports Scanning Specified Folders/Files: -hook xxx

2. Supports Keeping Specified Folders/Files: -keep xxx

3. Supports Replacing Specific Code in -hook Folders/Files: -replace xxx to yyy (xxx is the code before replacement, yyy
   is the code after replacement)

4. Supports Automatically Importing Packages during Replacement: -replace xxx to yyy [import aaa; import bbb]

5. Support extension (aspectProPluginHvigorfileCode is the plugin source code, rename it to hvigorfile to develop locally)

6. Support custom configuration rules (refer to aspectProPluginConfig.txt)

-------------------------------------------------------------------------------

## Download and Installation

```shell
**Har Dependency**
ohpm i @huolala/aspectpro

**Plugin Dependency<optional>**
1.Add the following to the project's root directory, in hvigor/hvigor-config.json5
"dependencies": {
    "aspect-pro-plugin": "0.0.7"
  }
  
2.Add the following to the entry's  hvigorfile.ts
import { aspectProPlugin } from 'aspect-pro-plugin';
export default {
  system: hapTasks, 
  plugins: [aspectProPlugin()]
}

3.Create a new aspectProPluginConfig.txt in the entry's 
# Configuration Rules - The plugin reads the configuration file line by line (by default, it reads all .js, .ts, and .ets files in the same directory as the hvigor-file)
# -hook path | file : Configure the file directory | file to be hooked and processed
# -keep path | file : Configure the additional directories | files to keep (optional, used when there are special files in the -hook file directory that do not need to be processed)
# -replace pattern replacement [import xxx;import xxx] : Configure the regular expression to be replaced and the corresponding replacement content [import aaa import bbb] for new dependencies to be imported

# For example:
#-hook ./src/main/ets/
-keep ./src/main/ets/hook/
-replace router.pushUrl this.getUIContext().getRouter().pushUrl
#-replace router.pushUrl this.getUIContext().getRouter().pushUrl [import { Logger } from '@huolala/logger';]

#Supporting third-party library code replacement
#-hook ./oh_modules/@hll-wp/foundation/src/main/com.wp.foundation/utils/WPFUtil.js
-replace IdUtils.next IdUtils.uuid
```

For more information regarding environment configuration for OpenHarmony ohpm, please refer
to[How to install OpenHarmony ohpm package](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md)

## Usage instruction

**1. Usage instruction**

 ```
   import AspectPro from '@hll-wp/aspectpro'
 ```

**2. User Guide**

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

* **2.3 hook Third Sdk Method **

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





