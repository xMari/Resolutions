import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from './user';
import * as firebase from 'firebase/app';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

@Injectable()
export class AuthService {
    user: Observable<firebase.User>;

    constructor(
        private angularFireAuth: AngularFireAuth,
        private googlePlus: GooglePlus,
        private facebook: Facebook) {
    }

    createUser(user: User) {
        return this.angularFireAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
    }

    signIn(user: User) {
        return this.angularFireAuth.auth.signInWithEmailAndPassword(user.email, user.password);
    }

    signInWithGoogle() {
        return this.googlePlus.login({
            'webClientId': '764041532194-g4eh8pt1ic7f652dbn54i6chki57v381.apps.googleusercontent.com',
            'offline': true
        })
            .then(res => {
                return this.angularFireAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
                    .then((user: firebase.User) => {
                        //atualizando o profile do usuário
                        return user.updateProfile({ displayName: res.displayName, photoURL: res.imageUrl })
                    });
            });
    }



    signInWithFacebook() {
        return this.facebook.login(['public_profile', 'email'])
            .then((res: FacebookLoginResponse) => {

                return this.angularFireAuth.auth.signInWithCredential(firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken));
            })
    }

    signOut() {
        if (this.angularFireAuth.auth.currentUser.providerData.length) {
            for (var i = 0; i < this.angularFireAuth.auth.currentUser.providerData.length; i++) {
                var provider = this.angularFireAuth.auth.currentUser.providerData[i];

               
                if (provider.providerId == firebase.auth.GoogleAuthProvider.PROVIDER_ID) {
                    return this.googlePlus.disconnect()
                        .then(() => {
                            return this.signOutFirebase();
                        });
                } else if (provider.providerId == firebase.auth.FacebookAuthProvider.PROVIDER_ID) { 
                    return this.facebook.logout()
                        .then(() => {
                            return this.signOutFirebase();
                        });
                }
            }
        }
        return this.signOutFirebase();
    }

    signOutFirebase() {
        return this.angularFireAuth.auth.signOut();
    }

    resetPassword(email: string) {
        return this.angularFireAuth.auth.sendPasswordResetEmail(email);
    }
}