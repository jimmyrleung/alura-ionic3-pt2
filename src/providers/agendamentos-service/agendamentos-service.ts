import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Agendamento } from '../../models/agendamento';
import { HttpServiceProvider } from '../http-service/http-service';

/*
  Generated class for the AgendamentosServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AgendamentosServiceProvider {
  constructor(private _http: HttpClient, private _httpService: HttpServiceProvider) {

  }

  agenda(agendamento: Agendamento) {
    return this._http
      .post(this._httpService.url + "/api/agendamento/agenda", agendamento)

      // deve ser habilitado no rxjs
      .do(() => agendamento.enviado = true)

      // Se der problema, retorna um Observable com um erro
      // Dessa forma podemos interceptar um observable mesmo que tenha dado erro
      // Deve ser habilitado no rxjs
      .catch((err) => Observable.of(new Error("Erro ao realizar agenndamento. Tente novamente mais tarde.")));
  }
}
