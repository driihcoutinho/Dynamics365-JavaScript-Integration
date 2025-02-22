import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {
  loginData = {
    email: '',
    password: ''
  };

  constructor(private router: Router) { }

  ngOnInit() { }

  onLogin() {
    try {
      console.log('Login attempt with:', this.loginData);
      // TODO: Implementar autenticação real
      // Por enquanto, apenas simula um login bem-sucedido
      this.router.navigateByUrl('/elo');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  }

  goToRegister() {
    try {
      this.router.navigateByUrl('/register');
    } catch (error) {
      console.error('Erro ao navegar para registro:', error);
    }
  }
}
