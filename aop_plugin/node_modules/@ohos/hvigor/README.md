<div style="text-align: center;font-size: xxx-large" >Hvigor</div>
<div style="text-align: center">A new automated build tool for OpenHarmonyOS application</div>

## Hvigor是什么?
***
- Hvigor是基于任务管理机制实现的一款全新的自动化构建工具，主要提供任务注册编排，编译工程模型管理，编译配置定制,插件扩展等核心能力，当前主要面向OpenHarmonyOS应用JS/eTS开发场景。
- Hvigor结构化模型：hvigor工程主要以build-profile.json5与hvigorfile.js组成
```
rootProject                        // Hvigor工程根目录
├── build-profile.json5            // 工程级别Hvigor配置，主要配置工程相关信息，包括子模块名字、路径等。
├── hvigorfile.js                  // 工程级别任务脚本，当前暂不支持自定义
├── moduleA
│   ├── build-profile.json5  // 模块级别Hvigor配置，主要模块构建相关参数
│   └── hvigorfile.js        // 模块级别任务脚本，当前暂不支持自定义
└── moduleB
    ├── build-profile.json5       // 模块级别Hvigor配置，主要模块构建相关参数
    └── hvigorfile.js             // 模块级别任务脚本，当前暂不支持自定义
```

## 安装使用
***
- 安装相应的nodejs与npm
- 通过npm命令行安装Hvigor
```shell
  npm install @ohos/hvigor
```
注:当前需要配合hvigor-ohos-plugin使用,所以也需要 npm install @ohos/hvigor-ohos-plugin
- 在DevEco Studio内使用Hvigor
  工程级package.json内配置:
```json
  "dependencies": {
"@ohos/hvigor": "1.0.6",
"@ohos/hvigor-ohos-plugin": "1.0.6"
}
```
注：
hvigor-ohos-plugin是基于hvigor插件机制开发的一款插件，服务于OpenHarmonyOS应用构建工作流，完成HAP/APP打包。详细指导：
<a href = "https://developer.harmonyos.com/cn/docs/documentation/doc-guides/ohos-building-overview-0000001263360495" >DevEco Studio</a>

- hvigor命令行

  运行命令行的结构
    ```shell
     hvigor [taskName...] [--option-name]
    ```
  详细参数：
    ```shell
        Usage: hvigor [options]
        Options:
        --version, -v  Print the global and local vigor versions.            [boolean]
        --cwd          Manually set the CWD. The search for the vigorfile, as well as
                       the relativity of all requires will be from here.      [string]
        --require      Will require a module before running the vigorfile. This is
                       useful for transpilers but also has other applications.[string]
        --prop, -p     Define extra properties.                               [string]
        --mode, -m     Specifies the mode in which the command is currently executed.[string]
        --sync, -s     Sync the information in plugin for other platform.    [boolean]
        --error, -e    Log errors only.                                      [boolean]
        --warn, -w     Set log level to warn.                                [boolean]
        --info, -i     Set log level to info.                                [boolean]
        --debug,-d     Set log level to debug.                               [boolean]
    ```
## 约束
***
    node版本要求： v14.18.3以及以上版本
