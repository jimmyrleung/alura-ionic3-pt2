import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Carro } from '../../models/carro';
import { HttpServiceProvider } from '../http-service/http-service';

/*
  Generated class for the CarrosServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CarrosServiceProvider {

  constructor(private _http: HttpClient, private _httpService: HttpServiceProvider) {

  }

  lista() {
    return this._http.get<Array<Carro>>(this._httpService.url + "/api/carro/listaTodos")
  }

}
