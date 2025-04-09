# <center>AspectPro</center>

-------------------------------------------------------------------------------
**[中文文档](README_CN.md)** ｜ **[Introduction](README.md)**

## 简介

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
1.使用插件在entry或其他模块的 hvigorfile.ts文件中添加
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
    
```







