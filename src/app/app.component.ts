import { Component, ViewChild } from '@angular/core';
import { Platform, List, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListaAgendamentosPage } from '../pages/lista-agendamentos/lista-agendamentos';
import { LoginPage } from '../pages/login/login';
import { PerfilPage } from '../pages/perfil/perfil';
import { UsuariosServiceProvider } from '../providers/usuarios-service/usuarios-service';
import { OneSignal, OSNotification } from '@ionic-native/onesignal';
@Component({
  selector: 'myapp',
  templateUrl: 'app.html'
})
export class MyApp {
  // Consegue recuperar um componente do nosso template
  @ViewChild(Nav)
  public nav: Nav;

  rootPage: any = LoginPage; // set HomePage as root page
  public paginas = [
    { titulo: 'Perfil', componente: PerfilPage.name, icone: 'person' },
    { titulo: 'Agendamentos', componente: ListaAgendamentosPage.name, icone: 'calendar' }
  ];

  constructor(platform: Platform, statusBar: StatusBar,
    splashScreen: SplashScreen,
    private _usuariosService: UsuariosServiceProvider,
    private _oneSignal: OneSignal) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      // configurar onesignal
      let iosConfig = {
        // Habilitar ou não pop-up de autorização de recebimento de notificações
        kOSSettingsKeyAutoPrompt: true,

        // queremos receber na minha notificação uma url para fazer uma navegação no app
        kOSSettingsKeyInAppLaunchURL: false
      };

      this._oneSignal
        .startInit("paste_app_id_here", "paste_google_project_number_here")
        .iOSSettings(iosConfig);

      // notificar mesmo que a aplicação esteja aberta
      this._oneSignal.inFocusDisplaying(
        this._oneSignal.OSInFocusDisplayOption.Notification
      );

      //o que o app deve fazer quando receber a notificação
      this._oneSignal.handleNotificationReceived()
        .subscribe(
          (notificacao: OSNotification) => {

          }
        )
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

