import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HttpClientModule } from '@angular/common/http';
import { CarrosServiceProvider } from '../providers/carros-service/carros-service';
import { EscolhaPage } from '../pages/escolha/escolha';
import { AgendamentosServiceProvider } from '../providers/agendamentos-service/agendamentos-service';

import { IonicStorageModule } from '@ionic/storage';

// habilita recursos do rxjs em toda aplicação
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import { AgendamentoDaoProvider } from '../providers/agendamento-dao/agendamento-dao';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    //EscolhaPage -> Será carregado por lazy loading
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot({
      name: 'aluracar',
      storeName: 'agendamentos',
      driverOrder: ['indexeddb'] // bds que queremos acessar
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [ // Componentes que queremos navegar
    MyApp,
    HomePage,
    //EscolhaPage -> Será carregado por lazy loading
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    CarrosServiceProvider,
    AgendamentosServiceProvider,
    AgendamentoDaoProvider // adicionado automaticamente pelo ionic cli,
  ]
})
export class AppModule { }
