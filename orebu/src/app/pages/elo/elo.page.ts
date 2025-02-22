import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-elo',
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Elo</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <h2>Bem-vindo ao Elo!</h2>
      <p>Esta página está em construção.</p>
    </ion-content>
  `,
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class EloPage implements OnInit {
  constructor() { }

  ngOnInit() { }
}
