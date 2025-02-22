import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RegisterPage implements OnInit {
  registerData = {
    username: '',
    email: '',
    birthdate: '',
    gender: '',
    sexualOrientation: '',
    password: '',
    confirmPassword: ''
  };

  constructor(private router: Router) { }

  ngOnInit() { }

  onRegister() {
    try {
      console.log('Register attempt with:', this.registerData);
      // TODO: Implementar registro real
      this.router.navigateByUrl('/terms');
    } catch (error) {
      console.error('Erro ao registrar:', error);
    }
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }
}
