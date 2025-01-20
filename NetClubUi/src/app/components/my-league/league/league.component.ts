import { Component, OnInit } from '@angular/core';
import { LeagueModel } from '../../../shared/models/league.model';
import { ClubMember } from '../../../shared/models/club.model';
import { ClubService } from '../../../shared/services/club.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { LeagueService } from '../../../shared/services/league.service';
import { DateformatPipe } from '../../../shared/Pipes/date-mask.pipe';
import { CommonModule } from '@angular/common';
import { first } from 'rxjs';
import { ClubModel } from '../../../shared/models/club.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.css'],
  standalone:true,
  imports:[DateformatPipe,
    CommonModule,FormsModule]
})
export class LeagueComponent implements OnInit{
  selectedNavItem: string='league'; 
  League:LeagueModel=new LeagueModel();
  clubDetail:any;
  id:any;
  myLeagues:LeagueModel[]=[];
  clubmembers:ClubMember[]=[];
  canShowInvite:boolean=false;
  InviteEmail:string='';

  ngOnInit(): void {
    this.clubService.selectedClub$.pipe(first()).subscribe(
      (club:any)=>{
        this.clubDetail=club;
      }
    );
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('clubId');
      if(this.id){
        this.leagueService.myLeague(this.id).pipe(first()).subscribe(
                  (leagues:LeagueModel[])=>{
                    this.myLeagues=leagues;
                  },
                (err: any)=>{this.router.navigate(['/home']);}
                );
        this.clubService.getClubMembers(this.id).subscribe(
          (members)=>{
            console.log(members);
            this.clubmembers=members;
          }
        );
      }
    });
  }
  showContent(tablename:string): void {
    this.selectedNavItem =tablename; 
  }
  checkop(){
    console.log(this.clubmembers);
  }
  constructor(private clubService:ClubService,private leagueService:LeagueService,private router: Router,private route:ActivatedRoute) {}
  createLeague(){
    console.log(this.clubDetail);
    this.router.navigate(['/createLeague']);
  }
  selectLeague(league:LeagueModel){
    console.log(league);
    this.leagueService.setLeague(league,true);
  }
  inviteLeague(member:any) {
    console.log(member);
   }
   showInvite(){
    this.canShowInvite=true;
  }
  hideInvite(){
    this.canShowInvite=false;
  }

  ClubInvite(){
    this.clubService.clubInvitation(this.InviteEmail,'http://localhost:4200/home/'+this.InviteEmail+'/joinclub/'+this.clubDetail.club_label).pipe(first()).subscribe((msg)=>{
      console.log(msg);
    },
    (err)=>{
      console.log(err);
    });
  }
}
