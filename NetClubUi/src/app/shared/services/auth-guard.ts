import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, ParamMap, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";

import { CoreService } from './core.service';
import { AuthService } from './auth.service';
import { Email } from '../models/user.model';


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    emailadd:string='';
    constructor(private coreService: CoreService, private router: Router,private authService:AuthService,private route:ActivatedRoute) { }

    canActivate(next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return new Promise(
            res => {
                if (!this.coreService.isLoggedIn()) {
                    var url=state.url;
                    this.authService.setRedirectUrl(url);
                    const emailmodel=new Email();
                    const regex = /\/home\/(.*?)\//;
                    const match = url.match(regex);
                    if (match && match.length > 1) {
                    const email = match[1];
                    emailmodel.email=email;
                    emailmodel.canEditEmail=false;
                  }
                    this.authService.emailCheck.next(emailmodel);
                    this.router.navigate(['/login']);
                }
            // if (!this.coreService.isLoggedIn()) {
               
                // const regex = /\/home\/(.*?)\/joinclub/;
                // const match = state.url.match(regex);
                // if (match && match.length > 1) {
                //     const email = match[1];
                //     console.log(email);
                //     this.emailadd=email;
                //     this.router.navigate(['/user/'+email]);
                //   }
                //    else {
                    // this.router.navigate(['/login']);
                    // this.router.navigate(['/user/'+this.emailadd]);
                    // console.log("Email not found in the route string.");
                //   }

                // this.authService.setRedirectUrl(state.url);
                // if(state.url.includes('/home/')){
                //     this.router.navigate([state.url.replace('home','user')]);
                // }
                // else{
                    //  this.router.navigate(['/login']);
                // }

            // }
            res(this.coreService.isLoggedIn());
        });
    }
}