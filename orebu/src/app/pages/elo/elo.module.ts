import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EloPage } from './elo.page';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: EloPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    EloPage
  ]
})
export class EloPageModule {}
