import { Injectable } from '@angular/core';

@Injectable()
export class HttpServiceProvider {

  private _baseUrl: string = "http://172.16.60.173:8080";

  get url() {
    return this._baseUrl;
  }

}
