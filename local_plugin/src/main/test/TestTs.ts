const TAG: string = "TestTs";
export class TestTs {
    static a(a1: Function) {
        console.debug(TAG, "1.TestTs->a()  method invoked");
        return a1.apply(this);
    }
    b(a: string, b: boolean) {
        console.debug(TAG, "1.TestTs->b()  method invoked");
    }
    c(c: string): string {
        console.debug(TAG, "1.TestTs->c()  method invoked");
        return c;
    }
}
