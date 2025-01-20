import {Component, Injectable, NgModule, OnInit} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CreateClubComponent } from '../../component/create-club/create-club.component';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ClubService } from '../../shared/services/club.service';
import { MyClub, RegisteredClub } from '../../shared/models/club.model';
import { Court} from '../../shared/models/court.model';
import { CommonModule} from '@angular/common';
import { DateformatPipe } from '../../shared/Pipes/date-mask.pipe';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { RegisterClubsComponent } from '../../component/register-clubs/register-clubs.component';
import { AuthService } from '../../shared/services/auth.service';
import { CourtService } from '../../shared/services/court.service';
import { SidenavbarComponent } from '../sidenavbar/sidenavbar.component';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CustomFilterPipe } from '../../shared/Pipes/custom-filter.pipe';
import { first } from 'rxjs';
import { CoreService } from '../../shared/services/core.service';
import { NavbarModule } from '../navbar/navbar.module';
import { Email } from '../../shared/models/user.model';
import { PopupDirective } from '../../shared/custom-directives/popup.directive';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html',
  standalone: true,

  imports: [MatTableModule,FormsModule,MatIconModule,CardModule, ButtonModule, CommonModule, SidenavbarComponent, DateformatPipe,CustomFilterPipe , MatDialogModule, RegisterClubsComponent,NavbarModule,PopupDirective]
})
export class HomeComponent implements OnInit{
  isMobileDevice: boolean = false;
  isLoading: boolean = false;
  constructor(private router:Router,private clubService:ClubService,private authService:AuthService,private courtService:CourtService,private route:ActivatedRoute,private coreService:CoreService){}
  filterText: string = '';
  selectedNav: string = 'RegisteredClubs'; 
  clubcode:any;
  showPopUp:boolean=false;
  
 
  clubs: any[] = [ 
    { League: 'Club 1', start: 'march', End: 'april', Teams:'2',Matches:'3' },
    { League: 'Club 2', start: 'april', End: 'may', Teams:'2',Matches:'5' },
    { League: 'Club 3', start: 'may', End: 'june', Teams:'3',Matches:'4' }
  ];


  showMyClubsContent(): void {
    this.selectedNav= 'myClubs'; 
  }
  showTennisContent(): void {
    this.selectedNav = 'Tennis'; 
  }
  
  showRegisteredContent(): void {
    this.selectedNav = 'RegisteredClubs'; 
  }

  sidebarVisible: boolean = false; 

  myClubs:MyClub[]=[];
  regClubs:RegisteredClub[]=[];
  courts:Court[]=[];

  selectClub:any;
selectedNavItem(navItem: string): void {
  // this.showLoader(); // Start loader immediately
  // setTimeout(() => {
  //   console.log('Simulated data fetching complete');
  // }, 20 * 1000); //  seconds in milliseconds
  this.selectedNav = navItem;
  // this.hideLoaderAfterDelay(5 * 1000);

}

  
ngOnInit(): void {
    // this.showLoader();
    this.route.paramMap.subscribe((params: ParamMap) => {
      var email=params.get('email');
      this.clubcode=params.get('clubCode');
      // this.hideLoaderAfterDelay(5 * 1000);
      if(email){
        if(this.coreService.checkEmailwithToken(email)){
          this.joinClub(this.clubcode);
        }
        else{
          this.authService.setRedirectUrl('/home/'+email+'/joinclub/'+this.clubcode);
          const emailmodel=new Email();
          emailmodel.email=email;
          emailmodel.canEditEmail=false;
          this.authService.emailCheck.next(emailmodel);
          this.coreService.isLoading.next(false);
          this.router.navigateByUrl('/login');
        }
        this.checkDeviceWidth();
      }
  });

    this.selectedNav= 'myClubs';
    if(this.clubService.listOfClub.length==0 || this.clubService.isNewClub){
      this.coreService.isLoading.next(false); 
        this.clubService.getMyClub().subscribe((myclub:MyClub[]) => {
            this.myClubs =myclub;
            this.clubService.listOfClub=myclub;
            this.clubService.isNewClub=false;
        });
    }
    else{
      this.myClubs=this.clubService.listOfClub;
    }
    this.clubService.getRegisterClub().subscribe((regclub:RegisteredClub[]) => {
        this.regClubs =regclub;
    });
    this.courtService.getCourts().subscribe((court:Court[]) => {
      this.courts=court;
    });
    }
    checkDeviceWidth(): void {
      const screenWidth = window.innerWidth;
      this.isMobileDevice = screenWidth <= 320; 
    }
    toggleSidebar(): void {
      this.sidebarVisible = !this.sidebarVisible;
    }
   selectMyClub(myClub:MyClub){
      this.selectClub=myClub;
      console.log(myClub);
      this.clubService.setMyClub(myClub);
    }
    selectRegClub(club:RegisteredClub){
      this.clubService.setRegClub(club);
    }

    createCourt(){
      this.router.navigate([`createCourt`]); 
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

    joinClub(clublabel:any){
      this.closePopUp();
      this.clubService.joinClub(clublabel).pipe(first()).subscribe(
        (msg:any)=>{
          console.log(msg);
          this.coreService.isLoading.next(false); // Hide loader on success
          this.router.navigateByUrl('/home').finally(() =>
            window.location.reload()
            );
        },
      (err: any)=>{
        console.error(err)
        this.coreService.isLoading.next(false); // Hide loader on success
        Swal.fire('Oops..','Something Went Wrong!Pleasety again','error')
        this.router.navigateByUrl('/home').finally(() =>
        window.location.reload()
        );
        }
    );
    }

    closePopUp(){
      this.isLoading = true;
      this.showPopUp=false;
      // this.router.navigateByUrl('/login');
      this.router.navigateByUrl('/home').finally(() =>
      window.location.reload()
      );
    }
    openPopUp(){
      this.isLoading = true;
      this.showPopUp=true;
    }
    gotoJoinClub(){
      this.router.navigate(['joinclub']);
    }
    // this.joinClub(this.clubcode);
    // showLoader(): void {
    //   this.coreService.isLoading.next(true); // If using a core service to manage loading state
    // }
  
    hideLoader(): void {
      // Implement your logic to hide the loader (e.g., reset the flag, hide the loading component)
      this.coreService.isLoading.next(false); // If using a core service to manage loading state
    }
  
    // hideLoaderAfterDelay(delayInMilliseconds: number): void {
    //   setTimeout(() => {
    //     this.hideLoader();
    //   }, delayInMilliseconds);
    // }
  }
  
