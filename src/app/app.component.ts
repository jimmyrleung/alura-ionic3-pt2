import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { HomePage } from '../pages/home/home';
import { ListaAgendamentosPage } from '../pages/lista-agendamentos/lista-agendamentos';
import { LoginPage } from '../pages/login/login';
import { PerfilPage } from '../pages/perfil/perfil';
import { UsuariosServiceProvider } from '../providers/usuarios-service/usuarios-service';
import { OneSignal, OSNotification } from '@ionic-native/onesignal';
import { AgendamentoDaoProvider } from '../providers/agendamento-dao/agendamento-dao';
@Component({
  selector: 'myapp',
  templateUrl: 'app.html'
})
export class MyApp {
  // Consegue recuperar um componente do nosso template
  @ViewChild(Nav)
  public nav: Nav;
  // SET AS ENVIRONMENT VARIABLE
  private _appid: string = "b7cbfcee-e202-4f90-8f3d-a89531e7418a"; // Fornecido pelo onesignal
  private _googleProjectNumber = "651895675221"; // Fornecido pelo firebase

  rootPage: any = LoginPage; // set HomePage as root page
  public paginas = [
    { titulo: 'Perfil', componente: PerfilPage.name, icone: 'person' },
    { titulo: 'Agendamentos', componente: ListaAgendamentosPage.name, icone: 'calendar' }
  ];

  constructor(platform: Platform, statusBar: StatusBar,
    splashScreen: SplashScreen, private _oneSignal: OneSignal,
    private _usuariosService: UsuariosServiceProvider,
    private _agendamentoDAO: AgendamentoDaoProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      //configurar onesignal
      let iosConfig = {
        // Habilitar ou não pop-up de autorização de recebimento de notificações
        kOSSettingsKeyAutoPrompt: true,

        // queremos receber na minha notificação uma url para fazer uma navegação no app
        kOSSettingsKeyInAppLaunchURL: false
      };

      this._oneSignal
        .startInit(this._appid, this._googleProjectNumber)
        .iOSSettings(iosConfig);

      // notificar mesmo que a aplicação esteja aberta
      this._oneSignal.inFocusDisplaying(
        this._oneSignal.OSInFocusDisplayOption.Notification
      );

      //o que o app deve fazer quando receber a notificação
      this._oneSignal.handleNotificationReceived()
        .subscribe(
          (notificacao: OSNotification) => {
            // Acessamos os dados adicionais da nossa notificação
            // Retorna um array
            let dadosAdicionais =
              notificacao.payload.additionalData;

            let agendamentoId = dadosAdicionais["agendamento-id"];

            this._agendamentoDAO.recupera(agendamentoId)
              .subscribe((agendamento) => {
                agendamento.confirmado = true;
                this._agendamentoDAO.salvar(agendamento);
              });
          });
      // Encerra a inicialização do onesignal
      this._oneSignal.endInit();
    });
  }

  get avatar() {
    return this._usuariosService.obtemAvatar();
  }

  navTo(componente) {
    this.nav.push(componente);
  }

  get usuarioLogado() {
    return this._usuariosService.obterUsuarioLogado();
  }
}

