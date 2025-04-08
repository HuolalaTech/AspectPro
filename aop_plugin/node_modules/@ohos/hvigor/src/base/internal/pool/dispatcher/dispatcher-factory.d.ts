import { DispatcherType } from '../enum/dispatcher-type.js';
import { Dispatcher } from './dispatcher.js';
/**
 * 分发器工厂
 * 创建不同类型的分发器
 *
 * @since 2022/8/16
 */
export declare class DispatcherFactory {
    static getDispatcher(type: DispatcherType): Dispatcher | undefined;
}
