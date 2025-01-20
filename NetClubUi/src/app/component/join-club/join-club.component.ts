import { Component } from '@angular/core';
import { ClubService } from '../../shared/services/club.service';
import { first } from 'rxjs';
import { ClubModel } from '../../shared/models/club.model';
import { Router} from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-join-club',
  templateUrl: './join-club.component.html',
  styleUrls: ['./join-club.component.css'], 
})
export class JoinClubComponent {
  clublabel:string="";
  selectedNav: string = 'RegisteredClubs';
  Msg:string="";
  constructor(private club:ClubService,private router:Router) {}
  selectedNavItem(navItem: string): void {
    this.selectedNav = navItem; 
  }
  joinClub(){
    this.club.joinClub(this.clublabel).pipe(first()).subscribe(
      (msg:any)=>{
        this.Msg=msg.text;
        console.log(msg);
         this.router.navigate(['/home']).finally(() =>
         window.location.reload()
         );
      },
    (err: any)=>{
      if(err.error && err.error.text)
        this.Msg=err.error.text;
      
      else
      this.Msg=err;
     this.router.navigate(['/home']).finally(() =>
         window.location.reload()
         );
      }
      
   
  );
  }
  onCancel() {
    this.router.navigate(['/home']);
  }
}
