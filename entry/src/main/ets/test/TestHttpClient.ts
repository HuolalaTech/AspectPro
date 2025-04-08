import { Logger } from '@huolala/logger/src/main/com.wp/Logger';
import { Chain, EventListener, HttpClient, Interceptor, Request, Response, TimeUnit } from '@ohos/httpclient';
import { TAG } from '../MyHookManager';


export class TestHttpClient {
  static client: HttpClient | undefined = undefined;
  static status: string = '' // 响应码
  static content: string = '' // 响应内容

  static testHttpGet() {

    if (!this.client) {
      this.client = new HttpClient.Builder()
        .setConnectTimeout(10, TimeUnit.SECONDS)
        .setReadTimeout(10, TimeUnit.SECONDS)
        .setWriteTimeout(10, TimeUnit.SECONDS)
        .build();
    }

    let request = new Request.Builder()
      .get("https://postman-echo.com/get?foo1=bar1&foo2=bar2")
      .addHeader("Content-Type", "application/json")
      .params("testKey1", "testValue1")
      .params("testKey2", "testValue2")
      .build();

    this.client.newCall(request).enqueue((result) => {
      if (result) {
        this.status = result.responseCode.toString();
      }
      if (result.result) {
        this.content = result.result;
      } else {
        this.content = JSON.stringify(result);
      }
      Logger.i(TAG,
        `testHttpGet()-> Status:${this.status} , onComplete -> Content:${JSON.stringify(this.content)}`);
    }, (error) => {
      this.status = error.code.toString();
      this.content = error.data;
      Logger.i(TAG, "testHttpGet()-> onError -> Error : " + this.content);
    });
  }
}

export class MyEventListener extends EventListener {
  constructor() {
    super();
  }

  callStart(call: any): void {
    Logger.w(TAG, "MyEventListener -> callStart()...")
  }

  dnsStart(call: any, domainName: string): void {
    // Logger.w(TAG, "MyEventListener -> dnsStart()...")
  }

  dnsEnd(call: any, domainName: string, inetAddressList: []): void {
    // Logger.w(TAG, "MyEventListener -> dnsEnd()...")
  }

  connectStart(call: any): void {
    // Logger.w(TAG, "MyEventListener -> connectStart()...")
  }

  secureConnectStart(call: any): void {
    // Logger.w(TAG, "MyEventListener -> secureConnectStart()...")
  }

  secureConnectEnd(call: any): void {
    // Logger.w(TAG, "MyEventListener -> secureConnectEnd()...")
  }

  connectEnd(call: any): void {
    // Logger.w(TAG, "MyEventListener -> connectEnd()...")
  }

  connectFailed(call: any): void {
    // Logger.w(TAG, "MyEventListener -> connectFailed()...")
  }

  connectionAcquired(call: any): void {
    // Logger.w(TAG, "MyEventListener -> connectionAcquired()...")
  }

  connectionReleased(call: any): void {
    // Logger.w(TAG, "MyEventListener -> connectionReleased()...")
  }

  requestHeadersStart(call: any): void {
    // Logger.w(TAG, "MyEventListener -> requestHeadersStart()...")
  }

  requestHeadersEnd(call: any, request: any): void {
    // Logger.w(TAG, "MyEventListener -> requestHeadersEnd()...request=" + JSON.stringify(request))
  }

  requestBodyStart(call: any): void {
    // Logger.w(TAG, "MyEventListener -> requestBodyStart()...")
  }

  requestBodyEnd(call: any, request: any): void {
    // Logger.w(TAG, "MyEventListener -> requestBodyEnd()...")
  }

  requestFailed(call: any, ioe: any): void {
    // Logger.w(TAG, "MyEventListener -> requestFailed()...")
  }

  responseHeadersStart(call: any): void {
    // Logger.w(TAG, "MyEventListener -> responseHeadersStart()...")
  }

  responseHeadersEnd(call: any, response: any): void {
    // Logger.w(TAG, "MyEventListener -> responseHeadersEnd()...")
  }

  responseBodyStart(call: any): void {
    // Logger.w(TAG, "MyEventListener -> responseBodyStart()...")
  }

  responseBodyEnd(call: any, response: any): void {
    // Logger.w(TAG, "MyEventListener -> responseBodyEnd()...")
  }

  responseFailed(call: any, ioe: any): void {
    // Logger.w(TAG, "MyEventListener -> responseFailed()...")
  }

  callEnd(call: any): void {
    Logger.w(TAG, "MyEventListener -> callEnd()...")
  }

  callFailed(call: any, ioe: any): void {
    // Logger.w(TAG, "MyEventListener -> callFailed()...")
  }
}

export class MyInterceptor implements Interceptor {
  intercept(chain: Chain): Promise<Response> {
    return new Promise<Response>(function (resolve, reject) {
      let request = chain.requestI();
      //获取request信息
      Logger.w(TAG, "MyInterceptor()-> request url= " + JSON.stringify(request.url))
      let response = chain.proceedI(request)
      response.then((data) => {
        //获取response信息
        Logger.w(TAG, "MyInterceptor()->  response = " + JSON.stringify(data))
        resolve(data)
      }).catch((err) => {
        reject(err)
      })
    })
  }
}
