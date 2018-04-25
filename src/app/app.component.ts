import { Component, ViewChild } from '@angular/core';
import { Platform, List, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListaAgendamentosPage } from '../pages/lista-agendamentos/lista-agendamentos';
import { LoginPage } from '../pages/login/login';
import { PerfilPage } from '../pages/perfil/perfil';
import { UsuariosServiceProvider } from '../providers/usuarios-service/usuarios-service';
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
    private _usuariosService: UsuariosServiceProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  navTo(componente) {
    this.nav.push(componente);
  }

  get usuarioLogado() {
    return this._usuariosService.obterUsuarioLogado();
  }
}

