import { HookArgMap, HookType } from '../../../../common/const/hook-const.js';
import { Consumer } from '../../../external/interface/consumer.js';
/**
 * hvigor生命周期中的hook点存放对象
 */
export declare class HvigorLifecycleHook {
    private static instance;
    private configEvaluatedFnList;
    private nodesInitializedFnList;
    private beforeNodeEvaluateFnList;
    private afterNodeEvaluateFnList;
    private nodesEvaluatedFnList;
    private taskGraphResolvedFnList;
    private buildFinishedFnList;
    private strategies;
    /**
     * 实现单例模式
     */
    static getInstance(): HvigorLifecycleHook;
    runFn<T>(array: Consumer<T>[], arg: T): Promise<void>;
    /**
     *
     * 运行一个hook上所有的方法
     *
     * @param hookType hook点类型
     * @param arg 方法的入参
     */
    runHook<K extends HookType>(hookType: K, arg: HookArgMap[K]): Promise<void>;
    configEvaluated(fn: Consumer<HookArgMap[HookType.configEvaluated]>): void;
    nodesInitialized(fn: Consumer<HookArgMap[HookType.nodesInitialized]>): void;
    beforeNodeEvaluate(fn: Consumer<HookArgMap[HookType.beforeNodeEvaluate]>): void;
    afterNodeEvaluate(fn: Consumer<HookArgMap[HookType.afterNodeEvaluate]>): void;
    nodesEvaluated(fn: Consumer<HookArgMap[HookType.nodesEvaluated]>): void;
    taskGraphResolved(fn: Consumer<HookArgMap[HookType.taskGraphResolved]>): void;
    buildFinished(fn: Consumer<HookArgMap[HookType.buildFinished]>): void;
    clear(): void;
}
