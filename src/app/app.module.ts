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
import { LoginPage } from '../pages/login/login';
import { UsuariosServiceProvider } from '../providers/usuarios-service/usuarios-service';
import { HttpServiceProvider } from '../providers/http-service/http-service';
import { Vibration } from '@ionic-native/vibration';
import { DatePicker } from '@ionic-native/date-picker';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage
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
    LoginPage
    //EscolhaPage -> Será carregado por lazy loading
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    CarrosServiceProvider,
    AgendamentosServiceProvider,
    AgendamentoDaoProvider,
    UsuariosServiceProvider,
    HttpServiceProvider, // adicionado automaticamente pelo ionic cli,
    Vibration,
    DatePicker,
    Camera
  ]
})
export class AppModule { }
