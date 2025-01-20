import { Component } from '@angular/core';
import { HomeComponent } from '../home/home.component';
@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent {
  router: any;
  authService: any;
  goToPage(pageName:string):void{
    this.router.navigate([`${pageName}`])
  }
  goToPage2(pageName:string):void{
    this.router.navigate([`${pageName}`])
  }
  logOut(){
    this.authService.logOut();
  }
}
