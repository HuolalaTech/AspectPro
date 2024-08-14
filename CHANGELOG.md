# Changelog

## [v1.0.0] 2024-07-30

`AspectPro`是一款轻量级的鸿蒙运行时hook框架。

* **1.对齐鸿蒙系统的Aspect能力**
* **2.简化使用姿势，无需关心是否为静态方法**
* **3.支持Hook 方法的行为 (如Button的onClick事件)**
* **4.支持Hook 方法内部class的方法 (如HttpClient.Builder().build())**
* **5.支持Hook writeable为false的方法需配合aspect-pro-plugin使用 (如router.pushUrl)**
* **6.支持Hook 运行时批量hook**

`aspect-pro-plugin`是一款轻量级的鸿蒙编译时代码修改框架。

* **1.支持扫描指定文件夹｜文件 ：-hook xxx**
* **2.支持keep指定文件夹｜文件 ：-keep xxx**
* **3.支持替换-hook文件夹｜文件下指定代码 ：-replace xxx to yyy (xxx为替换前代码 yyy替换后代码)**
* **4.支持replace时自动导包 -replace xxx to yyy [import xxx import bbb]**
* **5.支持扩展(aspectProPluginHvigorfileCode 是plugin源码, 重命名为hvigorfile即可本地开发)**
* **6.支持自定义配置规则 (参考aspectProPluginConfig.txt)**