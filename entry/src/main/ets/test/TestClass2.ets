import { Logger } from '@huolala/logger/src/main/com.wp/Logger';
import { TAG } from '../MyHookManager';


export class TestClass2 {
  // 函数声明
  static functionDeclarationExample() {
    Logger.d(TAG, "1.TestClass1->functionDeclarationExample() method invoked");
  }

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
}