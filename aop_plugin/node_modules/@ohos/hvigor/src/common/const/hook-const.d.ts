import { Hvigor } from '../../base/external/core/hvigor.js';
import { HvigorConfig } from '../../base/external/core/hvigor-config.js';
import { BuildResult } from '../../base/external/models/build-result.js';
import { HvigorNode } from '../../base/vigor/plugin/interface/hvigor-node.js';
export declare enum HookType {
    configEvaluated = 0,
    nodesInitialized = 1,
    beforeNodeEvaluate = 2,
    afterNodeEvaluate = 3,
    nodesEvaluated = 4,
    taskGraphResolved = 5,
    buildFinished = 6
}
export interface HookArgMap {
    [HookType.configEvaluated]: HvigorConfig;
    [HookType.nodesInitialized]: Hvigor;
    [HookType.beforeNodeEvaluate]: HvigorNode;
    [HookType.afterNodeEvaluate]: HvigorNode;
    [HookType.nodesEvaluated]: Hvigor;
    [HookType.taskGraphResolved]: Hvigor;
    [HookType.buildFinished]: BuildResult;
}
