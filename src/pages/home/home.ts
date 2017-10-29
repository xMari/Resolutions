import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth-service';
import { SigninPage } from '../signin/signin';
import { AngularFireAuth } from 'angularfire2/auth';
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  displayName: string;
  imgUrl: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthService,
    private afAuth: AngularFireAuth) {

      const authObserver = afAuth.authState.subscribe(user => {
        this.displayName = '';
        this.imgUrl = '';

        if (user) {
          this.displayName = user.displayName;
          this.imgUrl = user.photoURL;

           authObserver.unsubscribe();           
        }
      })
  }

  signOut() {
    this.authService.signOut()
      .then(() => {
        this.navCtrl.setRoot(SigninPage);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
