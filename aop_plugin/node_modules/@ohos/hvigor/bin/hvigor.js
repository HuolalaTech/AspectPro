#!/usr/bin/env node
"use strict";
/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2021-2022. All rights reserved.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = __importDefault(require("process"));
const semver_1 = require("semver");
const exit_js_1 = require("../src/base/boot/hooks/exit.js");
const base_log_js_1 = __importDefault(require("../src/base/log/base-log.js"));
const cli_js_1 = require("../src/cli/main/cli.js");
const prepare_node_path_js_1 = require("../src/cli/wrapper/prepare-node-path.js");
const util_js_1 = require("../src/cli/wrapper/util.js");
// 顺序不要改变
const cliOptions = (0, cli_js_1.parseCommand)();
const LOWEST_NODE_VERSION = 'v14.19.1';
// 优先检查node 的版本 要放在 parseCommand() 后面，不然日志 不会截断处理。
if ((0, semver_1.lt)(process_1.default.version, LOWEST_NODE_VERSION)) {
    base_log_js_1.default.error(`current node version: ${process_1.default.version}, node version cannot be lower than ${LOWEST_NODE_VERSION}`);
    (0, exit_js_1.exit)(-1);
}
(0, prepare_node_path_js_1.initNodePath)((0, util_js_1.getHvigorProjectHome)());
startDaemonIfNeeded().then(() => (0, cli_js_1.startHvigorBuild)(cliOptions));
// 如果不是stop 和 status命令  且是daemon模式
function checkDaemonCli(cliArgv) {
    return !cliArgv.stopDaemon && // --stop-daemon
        !cliArgv.stopDaemonAll && // --stop-daemon-all
        !cliArgv.statusDaemon && // --status
        cliArgv.daemon !== false; // daemon模式或未设置默认为daemon
}
async function startDaemonIfNeeded() {
    if (checkDaemonCli(cliOptions)) {
        await Promise.resolve().then(() => __importStar(require('../src/base/daemon/process/daemon-process-factory.js'))).then(module => {
            module.defaultDaemonServerFactory.createDaemonFork();
        });
    }
}
//# sourceMappingURL=hvigor.js.map