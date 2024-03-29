import { AuthService } from 'shared/services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {
    

  }
  //getting authenticate status of the user
  canActivate(route,state : RouterStateSnapshot) {
    // this.auth.user$.subscribe(
    //   user => {
    //     if(user)
    //       return true;
    //     this.router.navigate(['/login']);
    //   }
    // )

    return this.auth.user$.pipe(map(
      user => {
        if (user)
          return true;
        this.router.navigate(['/login'], {queryParams:{ returnUrl : state.url}});
        return false;
      }
    ));

  }

}
