import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from './user';
import * as firebase from 'firebase/app';
import { GooglePlus } from '@ionic-native/google-plus';

@Injectable()
export class AuthService {
    user: Observable<firebase.User>;

    constructor(
        private angularFireAuth: AngularFireAuth,
        private googlePlus: GooglePlus) {
        this.user = angularFireAuth.authState;
    }

    createUser(user: User) {
        return this.angularFireAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
    }

    signIn(user: User) {
        return this.angularFireAuth.auth.signInWithEmailAndPassword(user.email, user.password);
    }

    signWithGoogle() {
        return this.googlePlus.login({
            'webClientId': '764041532194-g4eh8pt1ic7f652dbn54i6chki57v381.apps.googleusercontent.com',
            'offline': true
        })
            .then(res => {
                return this.angularFireAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
                    .then((user: firebase.User) => {

                        return user.updateProfile({ displayName: res.displayName, photoURL: res.imageUrl })
                    });
            });
    }

    signOut(){
        if (this.angularFireAuth.auth.currentUser.providerData.length){
            for (var i = 0; i < this.angularFireAuth.auth.currentUser.providerData.length; i++){
                var provider = this.angularFireAuth.auth.currentUser.providerData[i];

                if (provider.providerId == firebase.auth.GoogleAuthProvider.PROVIDER_ID){
                    return this.googlePlus.disconnect()
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