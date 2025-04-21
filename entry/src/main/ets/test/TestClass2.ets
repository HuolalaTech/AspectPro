import { AutoCatch, MyClassDescriptor } from '../descriptor/AutoCatch';
import { TAG } from '../MyHookManager';

@MyClassDescriptor
export class TestClass2 {
  @AutoCatch
  static testCalculator() {
    console.debug(TAG, "1.TestClass2->functionDeclarationExample() method invoked");
  }

  testCalculator2() {
    let a = 1 + 2;
    console.debug(TAG, "1.TestClass2->functionDeclarationExample() method invoked a:" + a);
  }
}