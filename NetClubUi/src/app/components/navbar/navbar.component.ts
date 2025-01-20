import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { UserModel } from '../../shared/models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit{
  userDetails:UserModel=new UserModel();
  isShowUser:boolean=false;
  constructor(private authService:AuthService,private router:Router){}
  ngOnInit(): void {
    this.userDetails=this.authService.getUser();
  }
  toggleUserBtn(){
    this.isShowUser=!this.isShowUser;
  }
  goToPage(pageName:string):void{ 
    this.router.navigate([`${pageName}`])
  }
  goToPage2(pageName:string):void{
    this.router.navigate([`${pageName}`])
  }
  logOut(){
    this.authService.logOut();
}
isLoginPage(): boolean {
  return this.router.url.includes('/login') || this.router.url.includes('/register');
}
}