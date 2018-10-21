import { Injectable } from '@angular/core';
import { Agendamento } from '../../models/agendamento';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AgendamentoDaoProvider {

  constructor(private _storage: Storage) {

  }

  gerarChave(agendamento: Agendamento) {
    return agendamento.emailCliente + agendamento.data.substr(0, 10);
  }

  salvar(agendamento: Agendamento) {
    let promise = this._storage.set(this.gerarChave(agendamento), agendamento);
    return Observable.fromPromise(promise);
  }

  isDuplicado(agendamento: Agendamento) {
    let chave = this.gerarChave(agendamento);
    let promise = this._storage.get(chave)
      .then((data) => {
        return !!data;
      });

    return Observable.fromPromise(promise);
  }

  listaTodos() {
    let agendamentos: Array<Agendamento> = [];

    let promise = this._storage.forEach((agendamento: Agendamento) => {
      agendamentos.push(agendamento);
    }).then(() => agendamentos);

    return Observable.fromPromise(promise);
  }

  recupera(agendamentoId) {
    let promise = this._storage.get(agendamentoId);

    return Observable.fromPromise(promise);
  }

}
