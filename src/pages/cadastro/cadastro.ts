import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { Carro } from '../../models/carro';
import { AgendamentosServiceProvider } from '../../providers/agendamentos-service/agendamentos-service';
import { HomePage } from '../home/home';
import { Agendamento } from '../../models/agendamento';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { AgendamentoDaoProvider } from '../../providers/agendamento-dao/agendamento-dao';
import { Vibration } from '@ionic-native/vibration';
import { DatePicker } from '@ionic-native/date-picker';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {
  public carro: Carro;
  public preco: number;

  public nome: string = '';
  public endereco: string = '';
  public email: string = '';
  public data: string = new Date().toISOString();
  private _alerta: Alert

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _agendamentoService: AgendamentosServiceProvider,
    private _alertCtrl: AlertController,
    private _agentamentoDAO: AgendamentoDaoProvider,
    private _vibration: Vibration,
    private _datePicker: DatePicker) {

    this.carro = this.navParams.get('carroSelecionado');
    this.preco = this.navParams.get('precoTotal');

  }

  agendar() {
    this._vibration.vibrate(300);

    if (!this.nome || !this.endereco || !this.email) {
      this._alertCtrl.create({
        title: "Atenção",
        subTitle: "Preencha todos os campos.",
        buttons: [{
          text: "Ok"
        }]
      }).present();

      return;
    }

    let agendamento: Agendamento = {
      nomeCliente: this.nome,
      enderecoCliente: this.endereco,
      emailCliente: this.email,
      modeloCarro: this.carro.nome,
      precoTotal: this.preco,
      confirmado: false,
      enviado: false,
      data: this.data
    };

    // Precisamos colocar a criação do alerta aqui para que o alerta seja recriado
    // sempre que realizarmos um agendamento, pois ao clicar em Ok o alerta é destruído
    // e o ionic barra o acesso a um elemento que foi destruído
    this._alerta = this._alertCtrl.create({
      buttons: [{
        text: "Ok",
        handler: () => {
          // Ao invés de navegarmos e adicionarmos HomePage na pilha,
          // Navegamos para HomePage e setamos ela como raíz , pois caso
          // fosse utilizado o push o backbutton seria mostrado e o usuário
          // poderia voltar da tela de listagem para tela de cadastro
          this.navCtrl.setRoot(HomePage);
        }
      }]
    });

    let alertContent = { title: "", subtitle: "" };
    this._agentamentoDAO.isDuplicado(agendamento)
      .mergeMap(isDuplicado => {
        if (isDuplicado) {
          throw new Error("Esse agendamento já foi realizado.");
        }

        return this._agendamentoService.agenda(agendamento);
      })
      // o mergeMap "junta" dois observables
      // deve ser importado pelo rxjs
      .mergeMap((result) => {
        let observable = this._agentamentoDAO.salvar(agendamento);

        if (result instanceof Error) {
          throw result;
        }

        // O agendamento deve ser salvo no indexed db de qualquer forma, 
        // dando certo a requisição ou nao
        return observable;
      })
      // deve ser habilitado no rxjs (no app module ou no inicio deste arquivo)
      // pois por padrão deve ser desabilitado
      // sempre executa independente de erro ou sucesso
      .finally(
        () => {
          this._alerta.setTitle(alertContent.title).setSubTitle(alertContent.subtitle);
          this._alerta.present();
        })
      .subscribe(
        () => {
          alertContent.title = "Sucesso";
          alertContent.subtitle = "Agendamento realizado com sucesso.";
        },
        (err: Error) => {
          alertContent.title = "Erro";
          alertContent.subtitle = err.message;
        })
  }

  selecionaData() {
    this._datePicker.show({
      date: new Date(),
      mode: ""
    }).then(data => this.data = data.toISOString())
  }
}
