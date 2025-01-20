import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { MyClub, RegisteredClub } from '../../shared/models/club.model';
import { Router } from '@angular/router';
import { ClubService } from '../../shared/services/club.service';
import { AuthService } from '../../shared/services/auth.service';
import { CoreService } from '../../shared/services/core.service';
@Component({
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.css'],
  standalone:true
})
export class SidenavbarComponent {
  isSidebarVisible: boolean =false;
  isSmallScreen: boolean = false;
  constructor(private router: Router,private coreService:CoreService) {}

  @Output() selectedNavItemEvent = new EventEmitter<string>();
  selectedNavItem(eventData: string): void {
    this.selectedNavItemEvent.emit(eventData);
  }

  // Define the missing methods
  showMyClubsContent(): void {
    this.coreService.isLoading.next(false);
    this.selectedNavItemEvent.emit('myClubs');
  }
  
  showTennisContent(): void {
    this.coreService.isLoading.next(false);
    // this.router.navigate(['/']);
    this.selectedNavItemEvent.emit('Tennis');

  }


  showRegisteredContent(): void {
    this.coreService.isLoading.next(false);
    this.selectedNavItemEvent.emit('RegisteredClubs');
  }
  
  toggleSidebar(): void {
    this.coreService.isLoading.next(true);
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkScreenSize();
  }

  checkScreenSize(): void {
    this.isSmallScreen = window.innerWidth <= 425;
    if (!this.isSmallScreen) {
      this.isSidebarVisible = true; // Keep sidebar open for larger screens
    }
  }

  ngOnInit(): void {
    this.checkScreenSize(); 
  }

}