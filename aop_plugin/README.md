# <center>AspectPro</center>

-------------------------------------------------------------------------------
**[中文文档](README_CN.md)** ｜ **[Introduction](README.md)**

## Introduction

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
**Plugin Dependency<optional>**
1.Add the following to the entry's  hvigorfile.ts
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
```






