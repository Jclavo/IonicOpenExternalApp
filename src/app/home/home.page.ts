import { Component } from '@angular/core';
import { AppLauncher, AppLauncherOptions } from '@ionic-native/app-launcher/ngx';
import { Platform, AlertController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public appName = "com.google.android.gm";

  constructor(private appLauncher: AppLauncher,
              private platform: Platform,
              public alertController: AlertController,
              private iab: InAppBrowser
    )
   {}

  openApp(){

    if(!this.appName){
      this.presentAlert('Insert a value');
      return;
    }


    console.log('opening.....' + this.appName)
    const options: AppLauncherOptions = {
    }
    
    if(this.platform.is('ios')) {
      options.uri = 'fb://'
    } else {
      // options.packageName = 'com.facebook.katana'
      options.packageName = this.appName;
    }
    
    this.appLauncher.canLaunch(options)
      .then((canLaunch: boolean) => 
          // window.open('android-app://com.google.android.youtube',"_system"))
          // window.open('android-app://' + this.appName,"_system"))
          // this.presentAlert(options.packageName + ' is available'))
          this.iab.create('android-app://' + this.appName,"_system"))
          
      .catch((error: any) => this.presentAlert(options.packageName + ' is not available'));
  }

  async presentAlert(message) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: message,
      message: 'This is an alert message.',
      buttons: ['OK']
    });

    await alert.present();
  }

}
