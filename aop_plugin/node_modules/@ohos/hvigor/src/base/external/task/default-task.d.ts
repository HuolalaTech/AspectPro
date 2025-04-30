import { TaskDetails } from '../../internal/task/interface/task-details-interface.js';
import { HvigorCoreNode } from '../core/hvigor-core-node.js';
import { Registry } from './core-task.js';
import { CoreTaskImpl } from './core-task-impl.js';
/**
 * Hvigor自定义任务的基础抽象类
 *
 * @since 2022/4/24
 */
export declare abstract class DefaultTask extends CoreTaskImpl implements Registry {
    /**
     * 任何自定义的任务类都需要实现此构造方法，分别为指定模块的Node,以及对应的taskInfo
     * taskInfo可以只指定一个taskName，其他为默认值,或者为一个TaskDetails的对象
     *
     * @param {HvigorCoreNode} node
     * @param {string | TaskDetails} taskInfo
     * @protected
     */
    protected constructor(node: HvigorCoreNode, taskInfo: string | TaskDetails);
    /**
     * 注册task function
     *
     * @return {Function} 任务需要执行的逻辑
     */
    registryAction(): Function;
    /**
     * 获取task的执行逻辑函数
     *
     * @return {Function} 任务需要执行的逻辑
     */
    getAction(): Function;
}
