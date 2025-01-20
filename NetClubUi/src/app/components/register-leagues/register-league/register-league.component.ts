import { CommonModule,Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LeagueModel, userLeague } from '../../../shared/models/league.model';
import { ClubService } from '../../../shared/services/club.service';
import { LeagueService } from '../../../shared/services/league.service';
import { ActivatedRoute, NavigationExtras, ParamMap, Router } from '@angular/router';
import { first } from 'rxjs';
import { SidenavbarComponent } from '../../sidenavbar/sidenavbar.component';
import { DateformatPipe } from '../../../shared/Pipes/date-mask.pipe';
import { Team, TeamDoubles } from '../../../shared/models/team.model';
import { LeagueTypePipe } from '../../../shared/Pipes/league-type.pipe';
import { AuthService } from '../../../shared/services/auth.service';
import { Email, UserModel } from '../../../shared/models/user.model';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareModule } from 'ngx-sharebuttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { USER_KEY } from '../../../shared/contants/data-model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { Court } from '../../../shared/models/court.model';
import { CourtService } from '../../../shared/services/court.service';
import { ClubMember } from '../../../shared/models/club.model';
import { FormsModule } from '@angular/forms';
import { CoreService } from '../../../shared/services/core.service';
import { CourtDropdownComponent } from '../../court-dropdown/court-dropdown.component';
@Component({
  selector: 'app-register-league',
  templateUrl: './register-league.component.html',
  styleUrls: ['./register-league.component.css'],
  standalone:true,
  imports:[CommonModule,DateformatPipe,SidenavbarComponent,LeagueTypePipe,ShareButtonsModule,ShareModule,ShareIconsModule,MatSelectModule,FormsModule,CourtDropdownComponent]
})
export class RegisterLeagueComponent implements OnInit{
  League:LeagueModel=new LeagueModel();
  clubDetail:any;
  team_name:any;
  regLeagues:userLeague[]=[];
  team:Team=new Team();
  team_doubles:TeamDoubles=new TeamDoubles();
  clubmembers:ClubMember[]=[];
  courts:Court[]=[];
  club_id:any;
  league_id:any;
  friend_id:any;
  showCourt:boolean=false;
  selectLeagueId:number=0;
  canShowMember:boolean=false;
  canShowStandings:boolean = false;
  canShowInvite:boolean=false;
  InviteEmail:string='';
  showDoublesInvite:boolean=false;
  filterItems:any=[];
  isMyClub:boolean=false;
  selectedNav: string = 'RegisteredClubs'; 
  selectClub:any;
  
  showMyClubsContent(): void {
    this.selectedNav= 'myClubs'; 
  }
  showTennisContent(): void {
    this.selectedNav = 'Tennis'; 
  }
  
  showRegisteredContent(): void {
    this.selectedNav = 'RegisteredClubs'; 
  }

  selectedNavItem(navItem: string): void {

    this.selectedNav = navItem;

  
  }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      var email=params.get('email');
      this.club_id =params.get('clubId');
      this.league_id =params.get('leagueId');
      this.friend_id =params.get('friendId');
      console.log(params);
      const url=this.router.url;
      console.log(this.router.url);
      if(url.includes('regClub')){
        this.isMyClub=false;
      }
      else{this.isMyClub=true;}
      if(email){
        this.isMyClub=false;
        if(this.coreService.checkEmailwithToken(email)){
            if(this.club_id && this.league_id){
              if(this.league_id){
                this.showCourt=true;
                this.selectLeagueId=this.league_id;
              }
            }
        }
        else{
          if(this.friend_id){
            this.authService.setRedirectUrl('/home/'+email+'/regClub/'+this.club_id+'/league/'+this.league_id+'joinFriend/'+this.friend_id);
          }
          else{
            this.authService.setRedirectUrl('/home/'+email+'/club/'+this.club_id+'/league/'+this.league_id);
          }
          const emailmodel=new Email();
          emailmodel.email=email;
          emailmodel.canEditEmail=false;
          this.authService.emailCheck.next(emailmodel);
          this.router.navigateByUrl('/login');
        }
      }
      
      if(this.club_id){
        this.leagueService.myLeague(this.club_id).pipe(first()).subscribe(
          (leagues:userLeague[])=>{
            console.log(leagues);
            this.regLeagues=leagues;
          },
        (err: any)=>{this.router.navigate(['/home']);}
        );
        this.clubService.getClubById(this.club_id).subscribe(
          (club)=>{
            this.clubDetail=club;
          }
        );
      }

      this.clubService.getClubMembers(this.club_id).subscribe(
        (members)=>{
          this.clubmembers=members;
        }
      );

    });

    this.courtService.getCourts().pipe(first()).subscribe(
      (courts:Court[])=>{
        this.courts=courts;
      },
    (err: any)=>{console.log(err);}
    );
  }
  onItemSelected(item: Court) {
    this.selectCourt(item);
  }
  constructor(private clubService:ClubService,private leagueService:LeagueService,private router: Router,private route:ActivatedRoute,private authService:AuthService,private location: Location,private courtService:CourtService,private coreService:CoreService) {}
  createLeague(){
    console.log(this.clubDetail);
    this.router.navigate(['/createLeague/'+this.club_id]);
  }
  selectCourt(court:Court){
    console.log(court);
    if(this.friend_id){
        this.JoinDoubles(court.court_id);
    }else{
      this.JoinSingles(court.court_id);
    }
  }

  
  JoinSingles(courtId:number){
    this.showCourt=false;
    this.team.court_id=courtId;
    this.team.club_id=this.clubDetail?.id;
    this.team.league_id=this.selectLeagueId;
    this.team.team_name=this.authService.getUser().user_name;
    console.log(this.team);
    this.leagueService.TeamToJoinLeague(this.team).subscribe(
        (msg:any)=>{
          console.log(msg);
          this.router.navigateByUrl('/home').finally(() =>
            window.location.reload()
            );
          // window.location.reload();
        },
        (err:any)=>{
          console.log(err);
          console.log(err.error.text);
          // window.location.reload();
        }
      );
  }
  joinLeague(league:LeagueModel){
    this.selectLeagueId=league.id;
    if(league.league_type_id>2){
      this.showDoublesInvite=true;
    }else{
      this.showCourt=true;
      this.team.team_name=this.authService.getUser().user_name;
  }
  }
  
  ClubInvite(){
   this.clubService.clubInvitation(this.InviteEmail,'http://localhost:4200/home/'+this.InviteEmail+'/joinclub/'+this.clubDetail.club_label).pipe(first()).subscribe((msg)=>{
      console.log(msg);
    },
    (err)=>{
      console.log(err);
    });
  }
  
  
  inviteDouble(member:any) {
    var sendemail=member.email;
    this.leagueService.sendInviteEmail(sendemail,`http://localhost:4200/home/`+sendemail+`/club/`+this.club_id+`/league/`+this.selectLeagueId+`/joinFriend/`+this.authService.getUser().id).pipe(first()).subscribe((msg:any)=>{
            console.log(msg);
          },
          (err)=>{
            console.log(err.error.text);
          });
   }

   searchInput(event:any){
    console.log(event.target.value);
    if(event.target.value==""){
      this.filterItems=[];
    }
    else{
      this.filterItems=this.clubmembers.filter(member => member.email.toLowerCase().includes(event.target.value.toLowerCase()));
    }
  }

  closeCourt(){
    this.showCourt=false;
  }
 
  selectLeague(league:userLeague){
    if(league.is_join || this.isMyClub){
      this.leagueService.setLeague(league,this.isMyClub);
    }
  }
  showMember(){
    this.canShowMember=true;
    this.canShowStandings=false;
  }
  showStandings(){
    this.canShowStandings=true;
    this.canShowMember=false;
  }
  showLeagues(){
    this.canShowMember=false;
    this.canShowStandings=false;
  }
  showInvite(){
    this.canShowInvite=true;
  }
  hideInvite(){
    this.canShowInvite=false;
    this.showDoublesInvite=false;
  }
  AddTeam(member:any){
    this.friend_id=member.user_id;
    console.log(this.friend_id);
    this.showCourt=true;
  }
  JoinDoubles(courtId:number){
  var user_details=this.authService.getUser();
  this.team_doubles.club_id=this.club_id;
  if(this.league_id){
    this.team_doubles.league_id=this.league_id;
  }else{
    this.team_doubles.league_id=this.selectLeagueId;
  }
  this.team_doubles.court_id=courtId;
  this.team_doubles.team_name=user_details.user_name;
  this.team_doubles.player1=this.friend_id;
  this.team_doubles.player2=user_details.id;
  console.log(this.team_doubles);
  this.leagueService.joinTeamDoubles(this.team_doubles).pipe(first()).subscribe((msg:any)=>{
      console.log(msg);
  },
  (err)=>{
    console.log(err);
    this.showCourt=false;
    window.location.reload();

  }
  );
}



}

