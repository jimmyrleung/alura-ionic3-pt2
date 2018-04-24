import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { UsuariosServiceProvider } from '../../providers/usuarios-service/usuarios-service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string = "joao@alura.com.br";
  senha: string = "alura123";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _usuarioService: UsuariosServiceProvider,
    private _alertCtrl: AlertController) {
  }

  efetuarLogin() {
    this._usuarioService.login(this.email, this.senha)
      .subscribe(
        () => { this.navCtrl.setRoot(HomePage); },
        () => {
          this._alertCtrl.create({
            title: "Falha no login",
            subTitle: "E-mail e/ou senha incorretos",
            buttons: [{ text: "Ok" }]
          }).present();
        }
      )
  }

}
