import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Carro } from '../../models/carro';
import { Acessorio } from '../../models/acessorio';
import { CadastroPage } from '../cadastro/cadastro';

@IonicPage() // Para o lazyloading funcionar a classe deve estar decorada com IonicPage
@Component({
  selector: 'page-escolha',
  templateUrl: 'escolha.html',
})
export class EscolhaPage {

  public carro: Carro;
  public acessorios = [];
  public _precoTotal: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.carro = this.navParams.get('carroSelecionado');
    this._precoTotal = this.carro.preco;
    this.acessorios = [
      { nome: "Freio ABS", preco: 800 },
      { nome: "Ar-condicionado", preco: 1000 },
      { nome: "MP3 Player", preco: 500 }
    ]
  }

  atualizaTotal(ativado: boolean, acessorio: Acessorio) {
    this._precoTotal = ativado ? this._precoTotal + acessorio.preco : this._precoTotal - acessorio.preco;
  }

  get precoTotal() {
    return this._precoTotal;
  }

  avancarCadastro() {
    this.navCtrl.push(CadastroPage.name, { carroSelecionado: this.carro, precoTotal: this._precoTotal });
  }
}
