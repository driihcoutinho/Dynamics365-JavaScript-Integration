import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavigationService } from '../../services/navigation.service';
import { UiService } from '../../services/ui.service';

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

  isLoading = false;
  errorMessage = '';

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private navigationService: NavigationService,
    private uiService: UiService
  ) { }

  ngOnInit() {
  }

  validateForm(): boolean {
    if (!this.registerData.username) {
      this.errorMessage = 'Username is required';
      return false;
    }
    if (!this.registerData.email || !this.registerData.email.includes('@')) {
      this.errorMessage = 'Valid email is required';
      return false;
    }
    if (!this.registerData.birthdate) {
      this.errorMessage = 'Birthdate is required';
      return false;
    }
    if (!this.registerData.gender) {
      this.errorMessage = 'Gender is required';
      return false;
    }
    if (!this.registerData.sexualOrientation) {
      this.errorMessage = 'Sexual orientation is required';
      return false;
    }
    if (!this.registerData.password || this.registerData.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters';
      return false;
    }
    if (this.registerData.password !== this.registerData.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return false;
    }
    return true;
  }

  async onRegister() {
    this.errorMessage = '';
    if (!this.validateForm()) {
      return;
    }

    try {
      this.isLoading = true;
      await this.uiService.showLoading('Registering...');
      const { email, password } = this.registerData;
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      console.log('Registration successful:', userCredential);
      
      // Navigate to terms page
      this.navigationService.navigateAfterRegistration();
    } catch (error) {
      console.error('Registration failed:', error);
      this.errorMessage = 'Registration failed. Please try again.';
      await this.uiService.showError(this.errorMessage);
    } finally {
      this.isLoading = false;
      await this.uiService.hideLoading();
    }
  }

  goToLogin() {
    this.navigationService.navigateToLogin();
  }
}
