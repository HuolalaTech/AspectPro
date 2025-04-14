/**
 *

 // Getter访问器
 get exampleGetter() {
 Logger.d(TAG, "1.TestClass1->exampleGetter getter invoked");
 return "exampleGetter";
 }

 // Setter访问器
 set exampleSetter(value: string) {
 Logger.d(TAG, `1.TestClass1->exampleSetter setter invoked with value ${value}`);
 }

 // 箭头函数
 arrowFunctionExample = () => {
 Logger.d(TAG, "1.TestClass1->arrowFunctionExample() method invoked");
 };

 // 方法声明（这是类中的方法声明，与函数声明不同）
 methodDeclarationExample() {
 Logger.d(TAG, "1.TestClass1->methodDeclarationExample() method invoked");
 }


 // 函数表达式
 functionExpressionExample = function () {
 Logger.d(TAG, "1.TestClass1->functionExpressionExample() method invoked");
 };

 // 函数声明
 static functionDeclarationExample() {
 Logger.d(TAG, "1.TestClass1->functionDeclarationExample() method invoked");
 }
 */
import { Logger } from '@huolala/logger/src/main/com.wp/Logger';
import { TAG } from '../MyHookManager';
export class TestClass1 {
  static a(a1: Function) {
    Logger.d(TAG, "1.TestClass1->a()  method invoked");
    return a1.apply(this)
  }

  b(a: string, b: boolean) {
    Logger.d(TAG, "1.TestClass1->b()  method invoked");
    if (typeof a !== 'string') {
      throw new Error("Argument a is not a string");
    }
    if (typeof b !== 'boolean') {
      throw new Error("Argument b is not a boolean");
    }
    Logger.d(TAG, "1.TestClass1->b()  method end");
  }

  c(c: string): string {
    Logger.d(TAG, "1.TestClass1->c()  method invoked");
    try {
      if (typeof c !== 'string') {
        throw new Error("Argument c is not a string");
      }
      return c;
    } catch (error) {
      Logger.e(TAG, error.message);
      return '';
    }
  }
}