import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SidenavbarComponent } from './components/sidenavbar/sidenavbar.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']


})
export class AppComponent {
  displayMyClubsContent: boolean = false;

  showMyClubsContent(): void {
    this.displayMyClubsContent = true;
  }
  title = 'NetClubUi';
  selectedItem: any;
  data = [
    { name: 'Item 1', description: 'Description for item 1' },
    { name: 'Item 2', description: 'Description for item 2' },
  ];

  onItemClicked(item: any) {
    this.selectedItem = item;
  }
  constructor(private router: Router) {}

  isLoginPage(): boolean {
    return this.router.url === '/login';
  }

  isRegisterPage(): boolean {
    return this.router.url === '/register';
  }
  
}

