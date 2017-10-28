import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import {AngularFireModule} from 'angularfire2';
import { AngularFireAuthModule} from 'angularfire2/auth';

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { ResetpasswordPage } from '../pages/resetpassword/resetpassword';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';

import { AuthService } from '../providers/auth/auth-service';

const firebaseConfig = {
  apiKey: "AIzaSyA6UaRs-fuANSLU9CJw3gHXCjq2AeOtM4w",
  authDomain: "resolutions-9cfae.firebaseapp.com",
  databaseURL: "https://resolutions-9cfae.firebaseio.com",
  projectId: "resolutions-9cfae",
  storageBucket: "resolutions-9cfae.appspot.com",
  messagingSenderId: "764041532194"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ResetpasswordPage,
    SigninPage,
    SignupPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ResetpasswordPage,
    SigninPage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService
  ]
})
export class AppModule {}
