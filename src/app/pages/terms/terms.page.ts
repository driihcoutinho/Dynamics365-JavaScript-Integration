import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../../services/navigation.service';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class TermsPage implements OnInit {
  isLoading = false;

  constructor(
    private navigationService: NavigationService,
    private uiService: UiService
  ) { }

  ngOnInit() {
    // Verificar se o usuário está no fluxo de registro
    if (!this.navigationService.isInRegistrationFlow()) {
      this.navigationService.navigateToFeed();
    }
  }

  async acceptTerms() {
    const confirmed = await this.uiService.showConfirm(
      'Accept Terms',
      'By accepting these terms, you agree to follow our community guidelines. Do you wish to proceed?'
    );

    if (confirmed) {
      try {
        this.isLoading = true;
        await this.uiService.showLoading('Processing...');
        await this.navigationService.navigateAfterTermsAcceptance();
        await this.uiService.showSuccess('Welcome to OREBU!');
      } catch (error) {
        console.error('Error accepting terms:', error);
        await this.uiService.showError('Failed to process terms acceptance');
      } finally {
        this.isLoading = false;
        await this.uiService.hideLoading();
      }
    }
  }

  async declineTerms() {
    const confirmed = await this.uiService.showConfirm(
      'Decline Terms',
      'If you decline the terms, you will not be able to use the app. Are you sure you want to decline?'
    );

    if (confirmed) {
      try {
        this.isLoading = true;
        await this.uiService.showLoading('Processing...');
        await this.navigationService.navigateAfterTermsRejection();
      } catch (error) {
        console.error('Error declining terms:', error);
        await this.uiService.showError('Failed to process terms rejection');
      } finally {
        this.isLoading = false;
        await this.uiService.hideLoading();
      }
    }
  }
}
