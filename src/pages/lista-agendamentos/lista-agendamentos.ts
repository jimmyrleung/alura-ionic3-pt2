import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { AgendamentoDaoProvider } from '../../providers/agendamento-dao/agendamento-dao';
import { Agendamento } from '../../models/agendamento';
import { NavLifecycles } from '../../utils/ionic/nav/nav-lifecycle';
import { AgendamentosServiceProvider } from '../../providers/agendamentos-service/agendamentos-service';

@IonicPage()
@Component({
  selector: 'page-lista-agendamentos',
  templateUrl: 'lista-agendamentos.html',
})
export class ListaAgendamentosPage implements NavLifecycles {

  _alerta: Alert;
  agendamentos: Array<Agendamento>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _agendamentoDAO: AgendamentoDaoProvider,
    private _alertCtrl: AlertController,
    private _agendamentoService: AgendamentosServiceProvider) {

  }

  ionViewDidLoad() {
    this._agendamentoDAO.listaTodos()
      .subscribe(
        (agendamentos: Array<Agendamento>) => {
          this.agendamentos = agendamentos;
        })
  }

  ionViewDidEnter() {
    setTimeout(() => this.atualizaAgendamentos(), 3500);
  }

  atualizaAgendamentos() {
    this.agendamentos.filter((ag: Agendamento) => ag.confirmado)
      .forEach((agConfirmado: Agendamento) => {
        agConfirmado.visualizado = true; this._agendamentoDAO.salvar(agConfirmado)
      })
  }

  reenvia(agendamento: Agendamento) {
    this._alerta = this._alertCtrl.create({
      buttons: [{
        text: "Ok",
        handler: () => {
          this.navCtrl.setRoot(ListaAgendamentosPage);
        }
      }]
    });

    let alertContent = { title: "", subtitle: "" };
    this._agendamentoService.agenda(agendamento)
      .mergeMap((result) => {
        let observable = this._agendamentoDAO.salvar(agendamento);

        if (result instanceof Error) {
          throw result;
        }

        return observable;
      })
      .finally(
        () => {
          this._alerta.setTitle(alertContent.title).setSubTitle(alertContent.subtitle);
          this._alerta.present();
        })
      .subscribe(
        () => {
          alertContent.title = "Sucesso";
          alertContent.subtitle = "Agendamento reenviado sucesso.";
        },
        (err: Error) => {
          alertContent.title = "Erro";
          alertContent.subtitle = "Erro ao reenviar agendamento.";
        })
  }
}
