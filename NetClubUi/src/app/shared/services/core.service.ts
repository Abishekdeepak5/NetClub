
import { AuthService } from '../../shared/services/auth.service';
import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import { BehaviorSubject } from 'rxjs';
@Injectable({
    providedIn: 'root',
   })
export class CoreService {
    pageLoader: boolean = true;
    // isLoading: boolean = false;
    decoded:any;
    isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
    isLoadObs$ = this.isLoading.asObservable();


    private isAuthenticated: boolean = false;

    constructor(private authenticationService: AuthService) { }

    public isLoggedIn(): boolean {
        this.isAuthenticated = this.authenticationService.getToken() ? true : false;
        return this.isAuthenticated;
    }

    checkEmailwithToken(emailaddress:string):boolean{
         var token =this.authenticationService.getToken();
        this.decoded = jwtDecode(token!);
        console.log(this.decoded.email);
        console.log(this.decoded.email==emailaddress);
        if(this.decoded.email==emailaddress){
            console.log('Hello');
            return true;
        }
        else{
            return false;
            // this.authenticationService.logOut();
        }
    }

}