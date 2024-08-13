import AspectPro from '@huolala/aspectpro';
import { HttpClient } from '@ohos/httpclient';
import { MyEventListener, MyInterceptor } from './test/TestHttpClient';

export const TAG = "Aop_Demo"

export function testHookHttpClientBuild() {
  // 1.hook HttpClient#Builder()#build()
  AspectPro.hookMethod({
    target: HttpClient,
    methodNameOrProperty: 'Builder',
    beforeFn: (context, args) => {
      /**
       * todo
       * context:是函数执行上下文，类型为 HttpClient.Builder，
       * ets 暂时不支持typeof， 因此此处在.ts文件中hook
       */
      const builderContext = context as InstanceType<typeof HttpClient.Builder>;
      builderContext._eventListeners = new MyEventListener();
      builderContext.addInterceptor(new MyInterceptor());
    },
    propertyMethodNameOrType: 'build'
  })
}
