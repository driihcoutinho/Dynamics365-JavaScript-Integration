import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../../services/navigation.service';
import { AuthService } from '../../services/auth.service';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class HeaderComponent {
  @Input() title: string = '';

  constructor(
    private navigationService: NavigationService,
    private authService: AuthService,
    private uiService: UiService
  ) {}

  async onLogout() {
    const confirmed = await this.uiService.showConfirm(
      'Logout',
      'Are you sure you want to logout?'
    );

    if (confirmed) {
      try {
        await this.uiService.showLoading('Logging out...');
        await this.authService.logout();
        await this.uiService.showSuccess('Logged out successfully');
      } catch (error) {
        console.error('Logout error:', error);
        await this.uiService.showError('Failed to logout');
      } finally {
        await this.uiService.hideLoading();
      }
    }
  }

  navigateToFeed() {
    this.navigationService.navigateToFeed();
  }

  navigateToElo() {
    this.navigationService.navigateToElo();
  }
}
