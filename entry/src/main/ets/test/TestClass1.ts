import { Logger } from '@huolala/logger/src/main/com.wp/Logger';
import { TAG } from '../MyHookManager';


export class TestClass1 {
  static a(a1: Function) {
    Logger.d(TAG, "1.TestClass1->a()  method invoked");
    return a1.apply(this)
  }

  b(a: string, b: boolean) {
    Logger.d(TAG, "1.TestClass1->b()  method invoked");
  }

  c(c: string): string {
    Logger.d(TAG, "1.TestClass1->c()  method invoked");
    return c
  }
}