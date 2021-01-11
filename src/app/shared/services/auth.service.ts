import { UserService } from 'shared/services/user.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { Observable, pipe, of } from 'rxjs';
import { AppUser } from 'shared/models/app-user';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.default.User>;

  constructor(private angularFireAuth: AngularFireAuth,
    private userService: UserService,
    private route: ActivatedRoute) {
    this.user$ = angularFireAuth.authState;
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.angularFireAuth.signInWithRedirect(new firebase.default.auth.GoogleAuthProvider());
  }

  logout() {
    this.angularFireAuth.signOut();
  }

  get authfbUser(): Observable<AppUser> {
    return this.user$.pipe(
      switchMap(user =>{ 
        if (user) {
          console.log("user logged in")
         return this.userService.getUser(user.uid).valueChanges()
        }
        else { console.log("user logged out so returning null");
        return of(null);
        }
        }
      ))
  }
}
