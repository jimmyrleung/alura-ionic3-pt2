import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario';

@Injectable()
export class UsuariosServiceProvider {
  private _usuarioLogado: Usuario;

  constructor(private _http: HttpClient) {
  }

  login(email, senha) {
    return this._http.post<Usuario>("http://localhost:8080/api/login", { email, senha })
      .do(usuario => this._usuarioLogado = usuario);
  }

  obterUsuarioLogado() {
    // No angular é comum um service/provider guardar dados
    return this._usuarioLogado;
  }

}
