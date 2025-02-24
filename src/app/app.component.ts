import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AuthService } from './services/auth.service';
import { NavigationService } from './services/navigation.service';
import { UiService } from './services/ui.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  template: `
    <ion-app>
      <ion-router-outlet></ion-router-outlet>
    </ion-app>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  constructor(
    private platform: Platform,
    private authService: AuthService,
    private navigationService: NavigationService,
    private uiService: UiService
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    // Observar mudanças no estado de autenticação
    this.authService.user$.subscribe(user => {
      if (user) {
        console.log('User is authenticated:', user.email);
      } else {
        console.log('User is not authenticated');
      }
    });
  }

  private async initializeApp() {
    try {
      await this.platform.ready();
      console.log(`${environment.appName} v${environment.version} initialized`);

      // Verificar estado de autenticação inicial
      const isAuthenticated = await this.authService.isAuthenticated().toPromise();
      if (isAuthenticated) {
        await this.navigationService.navigateAfterLogin();
      }
    } catch (error) {
      console.error('Error initializing app:', error);
      await this.uiService.showError('Failed to initialize application');
    }
  }
}
