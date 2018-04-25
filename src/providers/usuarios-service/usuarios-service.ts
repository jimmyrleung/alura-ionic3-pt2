import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario';
import { HttpServiceProvider } from '../http-service/http-service';

const CHAVE = "avatar-usuario";

@Injectable()
export class UsuariosServiceProvider {
  private _usuarioLogado: Usuario;

  constructor(private _http: HttpClient, private _httpService: HttpServiceProvider) {
  }

  login(email, senha) {
    return this._http.post<Usuario>(this._httpService.url + "/api/login", { email, senha })
      .do(usuario => this._usuarioLogado = usuario);
  }

  obterUsuarioLogado() {
    // No angular é comum um service/provider guardar dados
    return this._usuarioLogado;
  }

  salvaAvatar(avatar) {
    localStorage.setItem(CHAVE, avatar);
  }

  obtemAvatar() {
    return localStorage.getItem(CHAVE) ? localStorage.getItem(CHAVE) : "assets/imgs/avatar-profile.jpg";
  }
}
