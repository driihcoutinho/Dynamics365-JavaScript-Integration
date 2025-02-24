import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NavigationService } from '../../services/navigation.service';
import { UiService } from '../../services/ui.service';

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

  isLoading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private navigationService: NavigationService,
    private uiService: UiService
  ) { }

  ngOnInit() {
    // Verificar se já está autenticado
    this.authService.isAuthenticated().subscribe(isAuth => {
      if (isAuth) {
        this.navigationService.navigateAfterLogin();
      }
    });
  }

  async onLogin() {
    if (!this.loginData.email || !this.loginData.password) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    try {
      this.isLoading = true;
      this.errorMessage = '';
      await this.uiService.showLoading('Logging in...');
      
      await this.authService.login(this.loginData.email, this.loginData.password);
    } catch (error) {
      console.error('Login error:', error);
      this.errorMessage = 'Invalid email or password';
      await this.uiService.showError(this.errorMessage);
    } finally {
      this.isLoading = false;
      await this.uiService.hideLoading();
    }
  }

  goToRegister() {
    this.navigationService.navigateToRegister();
  }

  // Método para validar o formato do email
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Método para validar a senha
  isValidPassword(password: string): boolean {
    return password.length >= 6;
  }

  // Método para validar o formulário antes do envio
  validateForm(): boolean {
    if (!this.loginData.email || !this.loginData.password) {
      this.errorMessage = 'Please fill in all fields';
      return false;
    }

    if (!this.isValidEmail(this.loginData.email)) {
      this.errorMessage = 'Please enter a valid email address';
      return false;
    }

    if (!this.isValidPassword(this.loginData.password)) {
      this.errorMessage = 'Password must be at least 6 characters';
      return false;
    }

    return true;
  }
}
