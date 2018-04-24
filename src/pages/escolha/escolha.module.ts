import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EscolhaPage } from './escolha';

@NgModule({
  declarations: [
    EscolhaPage,
  ],
  imports: [
    IonicPageModule.forChild(EscolhaPage),
  ],
  exports: [EscolhaPage] // Necessário para o lazyloading funcionar
})
export class EscolhaPageModule {}
