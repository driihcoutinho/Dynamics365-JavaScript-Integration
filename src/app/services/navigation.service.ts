import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private registrationFlow = {
    hasAcceptedTerms: false
  };

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  async navigateAfterLogin() {
    try {
      const user = await this.authService.getCurrentUser();
      if (!user) {
        this.router.navigate(['/login']);
        return;
      }

      // Se o usuário acabou de se registrar e não aceitou os termos
      if (!this.registrationFlow.hasAcceptedTerms) {
        this.router.navigate(['/terms']);
        return;
      }

      // Caso contrário, vai para o feed
      this.router.navigate(['/feed']);
    } catch (error) {
      console.error('Navigation error:', error);
      this.router.navigate(['/login']);
    }
  }

  async navigateAfterRegistration() {
    this.registrationFlow.hasAcceptedTerms = false;
    this.router.navigate(['/terms']);
  }

  async navigateAfterTermsAcceptance() {
    this.registrationFlow.hasAcceptedTerms = true;
    this.router.navigate(['/feed']);
  }

  async navigateAfterTermsRejection() {
    // Se rejeitar os termos, faz logout e volta para o registro
    await this.authService.logout();
    this.router.navigate(['/register']);
  }

  async navigateToFeed() {
    this.router.navigate(['/feed']);
  }

  async navigateToElo() {
    this.router.navigate(['/elo']);
  }

  async navigateToLogin() {
    this.router.navigate(['/login']);
  }

  async navigateToRegister() {
    this.router.navigate(['/register']);
  }

  resetRegistrationFlow() {
    this.registrationFlow.hasAcceptedTerms = false;
  }

  isInRegistrationFlow(): boolean {
    return !this.registrationFlow.hasAcceptedTerms;
  }
}
