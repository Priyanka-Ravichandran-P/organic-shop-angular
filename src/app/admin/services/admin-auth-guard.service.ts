import { UserService } from 'shared/services/user.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private route: Router, private userService: UserService) { }

  canActivate(): Observable<boolean> {
    // this.auth.user$.pipe(switchMap(user => {
    //   return this.userService.getUser(user.uid);
    // })).map(
    //   appUser => appUser.isAdmmn
    // )
    return this.auth.authfbUser.pipe( map (appUser => appUser.isAdmin));
    // this.auth.user$.pipe(map(user => { return this.userService.getUser(user.uid) }))
    // .subscribe(x=>console.log(x))

    

  }

}
