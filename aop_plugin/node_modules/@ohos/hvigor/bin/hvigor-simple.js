#!/usr/bin/env node
"use strict";
/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2023. All rights reserved.
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
// 此文件作为hvigor 工具自管理与构建态依赖管理变更之前的执行入口
// 鸿蒙工程api8及以前的版本使用此入口
const cli_js_1 = require("../src/cli/main/cli.js");
const cliOptions = (0, cli_js_1.parseCommand)();
(0, cli_js_1.startHvigorBuild)(cliOptions);
//# sourceMappingURL=hvigor-simple.js.map