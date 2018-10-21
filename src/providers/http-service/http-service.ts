import { Injectable } from '@angular/core';

@Injectable()
export class HttpServiceProvider {

  private _baseUrl: string = "http://192.168.1.70:8080";

  get url() {
    return this._baseUrl;
  }

}
