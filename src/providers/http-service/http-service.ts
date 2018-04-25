import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class HttpServiceProvider {

  private _baseUrl: string = "http://172.16.60.173:8080";

  get url() {
    return this._baseUrl;
  }

}
