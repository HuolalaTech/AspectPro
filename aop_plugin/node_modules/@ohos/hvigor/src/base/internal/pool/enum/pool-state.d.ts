/**
 * 池状态
 *
 * @since 2022/8/12
 */
export declare enum PoolState {
    /**
     * 初始化状态，线程池在此阶段初始化各个子模块，创建最小线程数对应的线程
     */
    INIT = "init",
    /**
     * 运行状态，线程池在此状态能正常接收外部提交的工作，并且正常执行工作
     */
    RUNNING = "running",
    /**
     * 停止状态，线程池在此状态停止接收外部提交的工作，清空就绪队列，仅继续执行当前正在执行的工作
     */
    STOP = "stop",
    /**
     * 关闭状态，线程池在此状态停止接收外部提交的工作，但能够正常执行当前正在执行的工作，以及就绪队列中的工作
     */
    CLOSE = "close",
    /**
     * 终止状态，线程池在此状态活动完全终止
     */
    TERMINATED = "terminated"
}
export declare const transitionMap: Map<PoolState, Set<PoolState>>;
