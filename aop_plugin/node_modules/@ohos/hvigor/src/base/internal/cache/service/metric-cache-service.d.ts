import { MapCacheService } from './map-cache-service.js';
import { BaseEvent } from '../../../metrics/event/base-event.js';
/**
 * 提供获取TaskMetric缓存的统一服务接口
 *
 * @since 2022/9/1
 */
export declare class MetricCacheService extends MapCacheService<BaseEvent> {
    private static instance;
    private constructor();
    add(event: BaseEvent): void;
    getEvents(): BaseEvent[];
    static getInstance(): MetricCacheService;
}
