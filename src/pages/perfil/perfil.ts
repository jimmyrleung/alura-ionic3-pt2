import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, normalizeURL } from 'ionic-angular';
import { UsuariosServiceProvider } from '../../providers/usuarios-service/usuarios-service';
import { Camera } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _usuariosService: UsuariosServiceProvider,
    private _camera: Camera) {
  }

  get usuarioLogado() {
    return this._usuariosService.obterUsuarioLogado();
  }

  get avatar() {
    return this._usuariosService.obtemAvatar();
  }

  tirarFoto() {
    this._camera.getPicture({
      // acessa um caminho de arquivo
      destinationType: this._camera.DestinationType.FILE_URI,
      saveToPhotoAlbum: true, // salvar no album
      correctOrientation: true // nao inverter a foto
    }).then(fotoUri => {
      // TODO: Testar com o emulador (uri incorreta)
      console.log(fotoUri);
      // normaliza a url para todas as plataformas
      fotoUri = normalizeURL(fotoUri);
      this._usuariosService.salvaAvatar(fotoUri);
    }).catch(err => console.log(err));
  }
}
