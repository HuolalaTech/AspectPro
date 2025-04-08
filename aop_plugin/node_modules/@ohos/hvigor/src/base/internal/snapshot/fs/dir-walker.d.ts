import { FsEvent } from './fs-event.js';
/**
 * 基于深度访问文件树, 不执行具体snapshot实例构建
 * 访问时返回对应FsEvent
 * Visitable实现类根据FsEvent处理snapshot实例的构建
 */
export declare class DirWalker {
    /**
     * 文件夹栈, 表示当前工作路径
     *
     * @private
     */
    private stack;
    private readonly followLinks;
    private readonly maxDepth;
    /**
     * 构造函数
     *
     * @param followLinks 是否支持文件链接
     * @param maxDepth 最大深度
     */
    constructor(followLinks: boolean, maxDepth?: number);
    /**
     * 入口函数
     *
     * @param file 文件绝对路径
     */
    walk(file: string): FsEvent | undefined;
    /**
     * 类迭代步进, 访问文件夹内元素
     */
    next(): FsEvent | undefined;
    /**
     * 处理文件及文件夹元素
     *
     * @param file 文件路径
     * @param stats fs.Stats
     * @private
     */
    private visit;
    private wouldLoop;
    private peekLast;
}
