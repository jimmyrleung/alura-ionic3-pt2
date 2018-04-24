import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Carro } from '../../models/carro';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { CarrosServiceProvider } from '../../providers/carros-service/carros-service';
import { NavLifecycles } from '../../utils/ionic/nav/nav-lifecycle';
import { EscolhaPage } from '../escolha/escolha';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements NavLifecycles {

  public carros: Array<Carro> = [];

  // O ionic ja injeta o NavController para que possamos fazer a navegação no nosso APP
  constructor(public navCtrl: NavController,
    private _carrosService: CarrosServiceProvider,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController) {
  }

  // Método relacionado ao ciclo de vida do ionic.
  // Obs: ainda poderíamos utilizar o ngOnInit
  ionViewDidLoad() {
    let loading = this._loadingCtrl.create({
      content: "Carregando lista de carros..."
    });

    loading.present();


    this._carrosService.lista()
      .subscribe((carros) => {
        this.carros = carros;
      }, (err: HttpErrorResponse) => {
        console.log(err);

        this._alertCtrl.create({
          title: "Falha na conexão",
          subTitle: "Não foi possível carregar a lista de carros. Tente novamente mais tarde.",
          buttons: [{ text: "Ok" }]
        }).present();

        loading.dismiss()
      }, () => loading.dismiss());
  }

  selecionaCarro(carro: Carro) {
    // Carregar o EscolhaPage normal
    // this.navCtrl.push(EscolhaPage, { carroSelecionado: carro });

    // Carregar o EscolhaPage de forma Lazy
    // Note que como é uma string podemos ter problemas de manutenção
    //this.navCtrl.push("EscolhaPage", { carroSelecionado: carro });

    // LazyLoading de uma forma melhor, prejudicando menos a manutenibilidade
    // Toda class tem o atributo name que devolve seu proprio name em forma de string
    // Assim que selecionarmos, o app irá buscar o EscolhaPage
    this.navCtrl.push(EscolhaPage.name, { carroSelecionado: carro });
  }

}
