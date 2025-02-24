import { Injectable } from '@angular/core';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private loading?: HTMLIonLoadingElement;

  constructor(
    private loadingController: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

  async showLoading(message: string = 'Please wait...') {
    this.loading = await this.loadingController.create({
      message,
      spinner: 'crescent',
      cssClass: 'custom-loading'
    });
    await this.loading.present();
  }

  async hideLoading() {
    if (this.loading) {
      await this.loading.dismiss();
      this.loading = undefined;
    }
  }

  async showToast(message: string, color: 'success' | 'danger' | 'warning' = 'success', duration: number = 2000) {
    const toast = await this.toastController.create({
      message,
      duration,
      color,
      position: 'top',
      cssClass: 'custom-toast',
      buttons: [
        {
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    await toast.present();
  }

  async showAlert(header: string, message: string, buttons: any[] = ['OK']) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons,
      cssClass: 'custom-alert'
    });
    await alert.present();
  }

  async showConfirm(header: string, message: string): Promise<boolean> {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        header,
        message,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => resolve(false)
          },
          {
            text: 'Confirm',
            handler: () => resolve(true)
          }
        ],
        cssClass: 'custom-alert'
      });
      await alert.present();
    });
  }

  async showError(error: any) {
    let message = 'An unexpected error occurred';
    
    if (typeof error === 'string') {
      message = error;
    } else if (error.message) {
      message = error.message;
    }

    await this.showToast(message, 'danger', 3000);
  }

  async showSuccess(message: string) {
    await this.showToast(message, 'success');
  }

  async showWarning(message: string) {
    await this.showToast(message, 'warning');
  }
}
