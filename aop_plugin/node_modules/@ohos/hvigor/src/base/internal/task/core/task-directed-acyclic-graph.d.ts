/**
 * 用于保存Hvigor的任务依赖关系的一个DAG图，提供包括添加图中节点，节点之间关系，判断节点之间是否联通等方法
 * _out和_in都是一个MultiMap，其中key是当前节点的唯一标识，即Task的path，value的大小是当前节点的入度或出度
 * _out用来保存所有以当前节点为头节点的节点信息集合,对应节点的出度
 * _in用来保存所有以当前节点为尾节点的节点信息集合，对应节点的入度
 *
 * @since 2022/4/24
 */
export declare class TaskDirectedAcyclicGraph {
    private _out;
    private _in;
    /**
     * 添加一个图中的节点
     *
     * @param {string} nodeKey
     */
    addNode(nodeKey: string): void;
    /**
     * 添加两个节点之间的边,为了保证为一个有向无环图，故添加时需要判断两点之间是否已包含边
     *
     * @param {string} originKey
     * @param {string} targetKey
     * @returns {boolean}
     */
    addEdge(originKey: string, targetKey: string): boolean;
    private _hasEdge;
    /**
     * 删除图中节点,同时要删除关联的起始和结束节点
     *
     * @param {string} nodeKey
     */
    removeNode(nodeKey: string): void;
    /**
     * 清空DAG图
     */
    clear(): void;
    /**
     * 根据节点的key获取其子节点
     *
     * @param {string} nodeKey
     * @returns {Set<string>}
     */
    getChildren(nodeKey: string): Set<string>;
    /**
     * 根据节点的key获取其父节点
     *
     * @param {string} nodeKey
     * @return {Set<string>}
     */
    getParent(nodeKey: string): Set<string>;
    /**
     * 获取所有入度为0的起始节点
     *
     * @returns {Set<string>}
     */
    getAllStartNodes(): Set<string>;
    /**
     * 获取所有出度为0的叶子节点
     *
     * @returns {Set<string>}
     */
    getAllEndNodes(): Set<string>;
    /**
     * 检查是否有环
     */
    checkCircle(): {
        hasCircle: boolean;
        circlePath: string[];
    };
    private dfsCircleCheck;
    private findAllZeroEdgeNodes;
}
/**
 * 整个工程需要一个全局单一的DAG图用来保存和执行模块之间的任务依赖
 */
export declare const projectTaskDag: TaskDirectedAcyclicGraph;
