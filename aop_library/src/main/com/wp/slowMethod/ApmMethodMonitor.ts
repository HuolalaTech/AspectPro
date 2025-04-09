import { Logger } from '@huolala/logger/src/main/com.wp/Logger';
/**
 * TODO 测试慢方法插桩
 */
export class ApmMethodMonitor {
  static i(methodId: String) {
    Logger.i("ApmMethodMonitor", `methodIn:${methodId}`)
  }

  static o(methodId: String) {
    Logger.i("ApmMethodMonitor", `methodOut:${methodId}`)
  }
}