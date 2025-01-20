import { CommonModule,Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LeagueService } from '../../../shared/services/league.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { LeagueModel } from '../../../shared/models/league.model';
import { ClubService } from '../../../shared/services/club.service';
import { first } from 'rxjs';
import { LeagueTeam, Team ,standingDetail} from '../../../shared/models/team.model';
import { SidenavbarComponent } from '../../sidenavbar/sidenavbar.component';
import { DateformatPipe } from '../../../shared/Pipes/date-mask.pipe';
import { Match,MatchTeam, MatchGetScore, MyMatch } from '../../../shared/models/match.model';
import { ClubMember } from '../../../shared/models/club.model';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { MatchService } from '../../../shared/services/match.service';

@Component({
  selector: 'app-league-team',
  templateUrl: './league-team.component.html',
  styleUrls: ['./league-team.component.css'],
  standalone:true,
  imports:[CommonModule,DateformatPipe,FormsModule,SidenavbarComponent]
})

export class LeagueTeamComponent implements OnInit {
  league:LeagueModel=new LeagueModel();
  selectedtable:string='League';
  teams:LeagueTeam[]=[];
  matches:Match[]=[];
  myMatches:MyMatch[]=[];
  clubmembers:ClubMember[]=[];
  filterItems:any=[];
  clubId:any;
  leagueId:any;
  canShowInvite:boolean=false;
  teamMember:string[]=[];
  weeks:number[]=[];
  numberOfteam:number=0;
  numberOfWeek:number=0;
  tempMatch:MatchTeam[]=[];
  allMatch:MatchTeam[]=[];
  match_scores:MatchGetScore[]=[];
  team_set:MatchGetScore=new MatchGetScore();
  isMyClub:boolean=false;
  selectedNav: string = 'RegisteredClubs'; 
  selectClub:any;
  teamMem:number[]=[];
  averagePoint: { [key: number]: number[] } = {};
  standing:MatchTeam[]=[];
  standingTeam:standingDetail[]=[];
  isDoubles:boolean=false;
  myTeamId:number=0;
  clubDetail:any="";
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
  
  constructor(private clubService:ClubService,private leagueService:LeagueService,private router:Router,private location:Location,private route:ActivatedRoute,private authService:AuthService,private matchService:MatchService){}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.clubId = params.get('clubId');
      this.leagueId=params.get('leagueId');
      const url=this.router.url;
      console.log(this.router.url);
      if(url.includes('regClub')){
        this.isMyClub=false;
      }
      else{this.isMyClub=true;}
      let user_id=this.authService.getUser().id;
      this.leagueService.getLeagueTeams(this.leagueId).pipe(first()).subscribe(
        (team:LeagueTeam[])=>{
          let teams:LeagueTeam[]=[];
          if(team.length>=2){
            if(team[0].team_id==team[1].team_id){
              this.isDoubles=true;
            }
          }
          let Myindex=team.findIndex(t=>t.user_id===user_id);
          this.myTeamId=team[Myindex].team_id;
          for(let i=0;i<team.length;i++){
            if(this.isDoubles){
              if(i%2==0){
                teams.push(team[i]);
              }
              // else{
              //   if(team[i].user_id==user_id){
              //     let Myindex1=teams.findIndex(t=>t.team_id===team[i].team_id);
              //     if(Myindex1!=-1){
              //       teams[Myindex1]=team[i];
              //     }
              //   }
              // }
            }else{
              teams.push(team[i]);
            }
          }
          let index1= teams.findIndex(t=>t.team_id===team[Myindex].team_id);
          teams[index1].team_name=teams[index1].team_name+" (You)";
          this.teams=teams;
        },
        (err:any)=>{
          this.router.navigate(['/home']);
        }
        );
        this.leagueService.getSchedule(this.leagueId).pipe(first()).subscribe(
          (matches:Match[])=>{
            this.matches=matches;
            console.log(matches);
          },
          (err:any)=>{
          });
          this.leagueService.GetMyMatch(user_id).pipe(first()).subscribe(
            (matches:MyMatch[])=>{
              for(let i of matches){
                if(i.league_id==this.leagueId){
                  if(i.player2_id==user_id){
                    i.isTeamOrder=false;
                  }else{
                    i.isTeamOrder=true;
                  }
                  this.myMatches.push(i);
                }
              }
              console.log(this.myMatches);
            }, 
            (err:any)=>{
            });

          this.clubService.getClubMembers(this.clubId).subscribe(
            (members)=>{
              this.clubmembers=members;
            }
          );
          this.leagueService.getLeagueById(this.leagueId).subscribe(
            (league:LeagueModel)=>{
              this.league=league;
              this.clubService.getClubById(league.club_id).subscribe(
                (club)=>{
                  this.clubDetail=club;
                }
              );
            }
          );
            
          this.matchService.getLeagueScores(this.leagueId).pipe(first()).subscribe(
            (match_scores:MatchGetScore[])=>{
              console.log(match_scores);
              this.match_scores=match_scores;
              this.MatchTable(this.matches.length);
            },
            (err:any)=>{
            });

    });
    console.log(this.numberOfteam);
  }
       
  createSchedule(){
    this.leagueService.ScheduleMatch(this.clubId,this.leagueId).pipe(first()).subscribe(
      (msg:any)=>{
        // console.log(msg);
      },
      (err:any)=>{
        // console.log(err.error.text);
        // console.log(err);
      }
      );
  }
  displayMyMatch(){
    this.selectedtable='myMatch';
  }
  displayLeague(){
    this.selectedtable='League'
  }
  displayMatch(){
    this.selectedtable='Match';
  }
  displayStanding(){
    this.selectedtable='standing';
  }
  showInvite(){
    this.canShowInvite=true;
  }
  hideInvite(){
    this.canShowInvite=false;
  }
  searchInput(event:any){
    // console.log(event.target.value);
    this.filterItems=this.clubmembers.filter(member => member.email.toLowerCase().includes(event.target.value.toLowerCase()));
  }
  inviteLeague(member:any) {
    // console.log('http://localhost:4200/home/'+member!.email+'/joinclub/:clubCode');
    this.leagueService.sendInviteEmail(member!.email,`http://localhost:4200/home/`+member!.email+`/club/`+this.clubId+`/league/`+this.leagueId).pipe(first()).subscribe((msg:any)=>{
            // console.log(msg);
          },
          (err)=>{
            // console.log(err.error.text);
          });
    
   }

  findTeam(team1Id: number): MatchTeam | false {
    const index = this.tempMatch.findIndex(obj => obj.teamId1 === team1Id);
    if (index !== -1) {
        return this.tempMatch.splice(index, 1)[0];
    }
    return false;
  }

   MatchTable(sum: number) {
    const discriminant = Math.sqrt(1 + 8 * sum);
    const n = ((-1 + discriminant) / 2)+1;
    this.numberOfteam=n;
    for (let i=1;i<n;i++){
      this.weeks.push(i);
    }
    this.numberOfWeek=this.weeks.length;
    let matchCount:number=0;
    if(n%2==0){
      matchCount=(n)/2;
      console.log(n,matchCount);
    }else{

      matchCount=(n+1)/2;
      console.log(n,matchCount);
    }
    let user_id=this.authService.getUser().id;
    for (let i=0;i<this.matches.length;i++){
      
      if(this.teamMem.indexOf(this.matches[i]["team1"]["team_id"])===-1){
        this.teamMem.push(this.matches[i]["team1"]["team_id"]);
        if(this.matches[i]["team1"]["team_id"]==this.myTeamId){
          this.teamMember.push(this.matches[i]["team1"]["team_name"]+" (You) ");
        }
        else{
            this.teamMember.push(this.matches[i]["team1"]["team_name"]);
          }
        // if(this.matches[i]["team1"]["team_id"]==myTeamId){
        //   this.teamMember.push(this.matches[i]["team1"]["team_name"]+" (You) ");
        // }
        // else{
        //   this.teamMember.push(this.matches[i]["team1"]["team_name"]);
        // }
      }
      if(this.teamMem.indexOf(this.matches[i]["team2"]["team_id"])===-1){
        this.teamMem.push(this.matches[i]["team2"]["team_id"]);
        if(this.matches[i]["team2"]["team_id"]==this.myTeamId){
          this.teamMember.push(this.matches[i]["team2"]["team_name"]+" (You) ");
        }
        else{
            this.teamMember.push(this.matches[i]["team2"]["team_name"]);
          }
        // if(this.matches[i]["player2_id"]==user_id){
        //   this.teamMember.push(this.matches[i]["team2"]["team_name"]+" (You) ");
        // }
        // else{
        //   this.teamMember.push(this.matches[i]["team2"]["team_name"]);
        // }
      }
      if(this.teamMem.length>=n){
        break;
      }
    }
   
    let k=0;
    for(let i=0;i<this.matches.length;i++){
      let teamID=this.teamMem[k];
      const t1=new MatchTeam();
          t1.matchId=this.matches[i]["match_id"];
          t1.teamId1=this.matches[i]["team1"]["team_id"];
          t1.teamId2=this.matches[i]["team2"]["team_id"];
          t1.team2name=this.matches[i]["team2"]["team_name"];
          t1.point=this.matches[i]["team1_point"];
          t1.rating=this.matches[i]["team1_rating"];
          t1.isChangeOrder=false;
          const team1_sets=this.match_scores.find(match=>match.match_id===t1.matchId);
          if(team1_sets!=null){
            t1.sets=team1_sets.sets;
          }
          else{ t1.sets=[]}
          const t2=new MatchTeam();
          t2.matchId=this.matches[i]["match_id"];
          t2.teamId1=this.matches[i]["team2"]["team_id"];
          t2.teamId2=this.matches[i]["team1"]["team_id"];
          t2.team2name=this.matches[i]["team1"]["team_name"];
          t2.point=this.matches[i]["team2_point"];
          t2.rating=this.matches[i]["team2_rating"];
          t2.isChangeOrder=true;
          let team2_sets=this.match_scores.find(match=>match.match_id===t2.matchId);
          if(team2_sets!=null){
            t2.sets=team2_sets.sets;
          }
          else{ t2.sets=[]}

          let tempteam:MatchTeam|boolean=this.findTeam(teamID);
        if(tempteam){
            this.allMatch.push(tempteam);
            i-=1;
        }
        else{
          if(teamID==t1.teamId1){
           this.allMatch.push(t1);
           this.tempMatch.push(t2);
          }
          else if(teamID==t2.teamId1){
           this.allMatch.push(t2);
           this.tempMatch.push(t1);
          }
          else{
           this.tempMatch.push(t1);
           this.tempMatch.push(t2);
           k=(k-1)%this.teamMem.length;
          }
        }
      k=(k+1)%this.teamMem.length;
    }
    if(k!==0){
      if(this.tempMatch.length!=0){
        while(k!=0 && this.tempMatch.length!=0){
          let teamID=this.teamMem[k];
          let tempteam:MatchTeam|boolean=this.findTeam(teamID);
          if(tempteam){
              this.allMatch.push(tempteam);
          }
          k=(k+1)%this.teamMem.length;
        }
      }
    }
    this.calculateAverage();
    
  }

startMatch(match:Match){
  this.router.navigate(['/score/'+match.match_id+'/team1/'+match.team1.team_name+'/team2/'+match.team2.team_name]); 
}

calculateAverage(){
  //averagePoint[tot_point,tot_rating,avg_point,avg_rating]
  this.sortTeam();
  let n=this.teamMem.length;
  for(let i=0;i<this.teamMem.length;i++){
    this.averagePoint[this.teamMem[i]]=[0,0];
    const standing=new standingDetail();
    standing.team_id=this.teamMem[i];
    standing.team_name=this.teamMember[i];
    this.standingTeam.push(standing); 
  }
  console.log(this.teamMem,this.teamMember);
  for (let match of this.allMatch){
    let index=match.teamId1;
    this.averagePoint[index][0]+=match.point;
    this.averagePoint[index][1]+=match.rating;
  }
  for(let i=0;i<this.teamMem.length;i++){
    let index=this.teamMem[i];
    let avg_point=(this.averagePoint[index][0]/n).toFixed(2);
    let avg_rating=(this.averagePoint[index][1]/n).toFixed(2);
    this.standingTeam[i].average_point=avg_point;
    this.standingTeam[i].average_rating=avg_rating;
    // this.averagePoint[index].push(avg_point);
    // this.averagePoint[index].push(avg_rating);
  }
  this.sortMatch();
}
priorityOrder: { [key: number]: number }={};
sortByPriorityOrder(a: MatchTeam, b:MatchTeam): number {
  const priorityA = this.priorityOrder[a.teamId1] || Infinity; // Use Infinity for undefined priorities
  const priorityB =this.priorityOrder[b.teamId1] || Infinity;
  return priorityA - priorityB;
}
sortMatch(){
  // const priorityOrder: { [key: number]: number } = {
    
  // };
  // 1: 0,   // Highest priority
  //   2: 1,
  //   3: 2,
  //   4: 3    // Lowest priority
  
  this.allMatch.sort((a,b)=>a.teamId1-b.teamId1);
  this.standing.push(...this.allMatch);
  // this.standing.sort((a,b)=>b.rating-a.rating);
  this.standingTeam.sort((a,b)=>b.average_rating-a.average_rating);
  for(let i =1; i < this.teamMem.length+1; i++){
    this.priorityOrder[this.standingTeam[i-1].team_id]=i;
   }
   console.log(this.priorityOrder);
   this.standing.sort((a,b)=>{
    const priorityA = this.priorityOrder[a.teamId1]; // Use Infinity for undefined priorities
    const priorityB =this.priorityOrder[b.teamId1];
    return priorityA-priorityB;
   });
  console.log(this.allMatch);
  console.log(this.standing);
  console.log(this.teamMem,this.teamMember);
}
sortTeam(){
  const length = this.teamMem.length;
  for (let i = 0; i < length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < length; j++) {
      if (this.teamMem[j] < this.teamMem[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [this.teamMem[i], this.teamMem[minIndex]] = [this.teamMem[minIndex], this.teamMem[i]];
      [this.teamMember[i], this.teamMember[minIndex]] = [this.teamMember[minIndex], this.teamMember[i]];
    }
  }
}
}


