import { HvigorCoreNode } from '../../external/core/hvigor-core-node.js';
import { DurationEvent } from '../../metrics/event/duration-event.js';
/**
 * Config整个hvigor的项目，进行数据绑定
 *
 */
export declare function configuration(parentEvent: DurationEvent): Promise<HvigorCoreNode>;
