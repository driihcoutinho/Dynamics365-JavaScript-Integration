import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class TermsPage implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() { }

  onAcceptTerms() {
    try {
      console.log('Termos aceitos');
      this.router.navigateByUrl('/elo');
    } catch (error) {
      console.error('Erro ao aceitar termos:', error);
    }
  }

  onDeclineTerms() {
    try {
      console.log('Termos recusados');
      this.router.navigateByUrl('/register');
    } catch (error) {
      console.error('Erro ao recusar termos:', error);
    }
  }
}
