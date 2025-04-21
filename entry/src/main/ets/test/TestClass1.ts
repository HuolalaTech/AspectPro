import { TAG } from '../MyHookManager';

export class TestClass1 {
  static a(a1: Function) {
    console.debug(TAG, "1.TestClass1->a()  method invoked");
    return a1.apply(this)
  }

  b(a: string, b: boolean) {
    if (typeof a !== 'string') {
      throw new Error("Argument a is not a string");
    }
    if (typeof b !== 'boolean') {
      throw new Error("Argument b is not a boolean");
    }
  }

  c(c: string): string {
    try {
      if (typeof c !== 'string') {
        throw new Error("Argument c is not a string");
      }
      return c;
    } catch (error) {
      console.error(TAG, error.message);
      return '';
    }
  }

  // 箭头函数
  arrowFunctionExample = () => {
    console.debug(TAG, "1.TestClass1->arrowFunctionExample() method invoked");
  };

  // 方法声明（这是类中的方法声明，与函数声明不同）
  methodDeclarationExample() {
    console.debug(TAG, "1.TestClass1->methodDeclarationExample() method invoked");
  }

  // 函数表达式
  functionExpressionExample = function () {
    console.debug(TAG, "1.TestClass1->functionExpressionExample() method invoked");
  };

  // 函数声明
  static functionDeclarationExample() {
    console.debug(TAG, "1.TestClass1->functionDeclarationExample() method invoked");
  }

  static emptyMethod() {
  }
}

function d() {
  let a = 1 << 2;
  console.debug(TAG, "1.TestClass1->d() method invoked");
}