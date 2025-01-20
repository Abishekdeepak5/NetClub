import { Component, Injectable, OnInit } from '@angular/core';
import { LeagueModel} from '../../../shared/models/league.model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CommonModule,Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { MyClub } from '../../../shared/models/club.model';
import { ClubService } from '../../../shared/services/club.service';
import { LeagueService } from '../../../shared/services/league.service';

@Component({
  selector: 'app-create-league',
  templateUrl: './create-league.component.html',
  styleUrls: ['./create-league.component.css'],
  standalone:true,
  imports:[
    CommonModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    CheckboxModule,
    CardModule,
  ],
})
// @Injectable()
export class CreateLeagueComponent implements OnInit{
    League:LeagueModel=new LeagueModel();
    clubDetail:any;
    club_id:any;
    schedule_type:string='';
  ngOnInit(): void {

    this.route.paramMap.subscribe((params: ParamMap) => {
      
      this.club_id =params.get('clubId');
      if(this.club_id){
        this.clubService.getClubById(this.club_id).subscribe(
          (club)=>{
            console.log(club);
            this.clubDetail=club;
          }
        );
      }
      else{
        console.log(this.club_id);
      }
    });


    // this.clubService.selectedClub$.subscribe((item:any)=>{
    //   if(item==null){
    //     this.router.navigate(['/home']);
    //   }
    //     this.clubDetail=item;
    // });
  }
  constructor(private clubService:ClubService,private leagueService:LeagueService,private router: Router,private location: Location,private route:ActivatedRoute) {
  }
    postLeague(){
      this.League.club_id=this.clubDetail?.id;
      this.leagueService.createLeague(this.League).subscribe(
      (msg:any)=>{
        this.location.back();

      },
    (err: any)=>{
      if(err.error.text=="League created"){
        this.location.back();
      }else{
        this.location.go(this.location.path());
      }
      }
      );
      
      console.log(this.clubDetail);
      console.log(this.League);
    
    }
    onCancel() {
      this.router.navigate(['/club/54']);
    }
}
