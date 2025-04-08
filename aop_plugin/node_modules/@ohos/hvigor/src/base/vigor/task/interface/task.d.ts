/**
 * 对外暴露的通过接口获取Task信息的接口
 */
export interface Task {
    /**
     * 任务名称，全局唯一
     */
    getName: () => string;
    /**
     * 当前Task依赖的Task列表
     * 前置依赖的tasks, 先执行前置依赖，再执行此task
     */
    getDependencies: () => string[];
    /**
     * 禁用任务
     *
     * @param enable
     */
    setEnable: (enable: boolean) => void;
    /**
     * beforeRun 先进后出
     *
     * @param fn
     */
    beforeRun: (fn: Function) => void;
    /**
     * afterRun 先进先出
     *
     * @param fn
     */
    afterRun: (fn: Function) => void;
}
