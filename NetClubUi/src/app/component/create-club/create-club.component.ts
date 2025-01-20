import { Component,ElementRef,Injectable,OnInit } from '@angular/core';
import { ClubModel } from '../../shared/models/club.model';
import { ClubService } from '../../shared/services/club.service';
import { first } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { AuthService } from '../../shared/services/auth.service'
import { Router } from '@angular/router';
import { CoreService } from '../../shared/services/core.service';
import { SidenavbarComponent } from '../../components/sidenavbar/sidenavbar.component';

@Component({
  selector: 'app-create-club',
  templateUrl: './create-club.component.html',
  styleUrls: ['./create-club.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    CheckboxModule,
    CardModule,
    SidenavbarComponent
  ],

})
@Injectable()
export class CreateClubComponent{
  selectedNav: string = 'RegisteredClubs';
  Club:ClubModel=new ClubModel();
  constructor(private club:ClubService,private auth:AuthService,private router:Router,private core:CoreService) {

  }
  ngOnInit(): void {
  }
  selectedNavItem(navItem: string): void {
    this.showLoader(); // Start loader immediately
  setTimeout(() => {
    console.log('Simulated data fetching complete');
  }, 20 * 1000); //  seconds in milliseconds
  this.selectedNav = navItem;
  this.hideLoaderAfterDelay(5 * 1000);
  }
  welcomeMsg:any;
  display(){
    console.log(this.Club);
  }
  postClub(){
    
    this.Club.created_by=this.auth.getUser().user_name;
    this.club.createClub(this.Club).pipe(first()).subscribe(
      (msg:any)=>{
        this.welcomeMsg=msg;
        this.router.navigate(['/home']).finally(() =>
        window.location.reload()
        );
      },
    (err: any)=>{
        this.welcomeMsg=err;
        this.router.navigate(['/home']).finally(() =>
        window.location.reload()
        );
      }
   
  );
  }
  showLoader(): void {
    // Implement your logic to show the loader (e.g., set a flag, display a loading component)
    this.core.isLoading.next(true); // If using a core service to manage loading state
  }

  hideLoader(): void {
    // Implement your logic to hide the loader (e.g., reset the flag, hide the loading component)
    this.core.isLoading.next(false); // If using a core service to manage loading state
  }

  hideLoaderAfterDelay(delayInMilliseconds: number): void {
    setTimeout(() => {
      this.hideLoader();
    }, delayInMilliseconds);
  }

}
