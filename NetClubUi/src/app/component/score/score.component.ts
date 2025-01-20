import { Component, OnInit } from '@angular/core';
import { LeagueService } from '../../shared/services/league.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { MatchService } from '../../shared/services/match.service';
import { MatchGetScore, MatchScore } from '../../shared/models/match.model';
import { first } from 'rxjs';
import { CommonModule,Location } from '@angular/common';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})


export class ScoreComponent implements OnInit{
  matchId:any;
  setOne:MatchScore=new MatchScore();
  setTwo:MatchScore=new MatchScore();
  setThree:MatchScore=new MatchScore();
  isEditSetOne:boolean=true;
  isEditSetTwo:boolean=false;
  isEditSetThree:boolean=false;
   team1name:any="";
   team2name:any="";
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.matchId= params.get('matchId');
      this.team1name=params.get('team1');
      this.team2name=params.get('team2');
      console.log(params.getAll);
       
      console.log(this.matchId);
    });

    this.matchService.getScore(this.matchId).pipe(first()).subscribe(
      (match_score:MatchGetScore)=>{
        console.log(match_score);
        let scores=match_score.sets;
        // let i=0
        let lenOfScore=scores.length;
        if(lenOfScore>0){
          this.location.back();
          this.setOne.team1Score=scores[0].team1score;
          this.setOne.team2Score=scores[0].team2score;
          this.isEditSetOne=false;
          if(lenOfScore>1){
            this.setTwo.team1Score=scores[1].team1score;
            this.setTwo.team2Score=scores[1].team2score;
            this.isEditSetTwo=false;
            if(lenOfScore>2){
              this.setThree.team1Score=scores[2].team1score;
              this.setThree.team2Score=scores[2].team2score;
              this.isEditSetThree=false;
            }
            else{
              this.isEditSetThree=true;
            }
          }
          else{
            this.isEditSetTwo=true;
          }
        }
      },
      (err:any)=>{
        console.log(err);
      }
      );
  }
  constructor(private leagueService:LeagueService,private router:Router,private route:ActivatedRoute,private authService:AuthService,private matchService:MatchService,private location: Location){}
  selectedNav: string = 'RegisteredClubs';
  team1Default: boolean = false;
  team1Retired: boolean = false;
  team2Default: boolean = false;
  team2Retired: boolean = false;
  // setOneScore(){
  //   this.isEditSetOne=false;
  //   this.isEditSetTwo=true;
  //   this.setOne.matchId=this.matchId;
  //   this.setOne.setNumber=1;
  //   console.log(this.setOne);
  //   this.matchService.setScore(this.setOne).pipe(first()).subscribe(
  //     (msg:any)=>{
  //       console.log(msg);
  //     },
  //     (err:any)=>{
  //       console.log(err);
  //     }
  //     );
  // }
  // setTwoScore(){
  //   this.isEditSetTwo=false;
  //   this.isEditSetThree=true;
  //   this.setTwo.matchId=this.matchId;
  //   this.setTwo.setNumber=2;
  //   this.matchService.setScore(this.setTwo).pipe(first()).subscribe(
  //     (msg:any)=>{
  //       console.log(msg);
  //     },
  //     (err:any)=>{
  //       console.log(err);
  //     }
  //     );
  // }
  // setThreeScore(){
  //   this.isEditSetThree=false;
  //   this.setThree.matchId=this.matchId;
  //   this.setThree.setNumber=3;
  //   this.matchService.setScore(this.setThree).pipe(first()).subscribe(
  //     (msg:any)=>{
  //       console.log(msg);
  //     },
  //     (err:any)=>{
  //       console.log(err);
  //     }
  //     );
  // }
  calculateScore()
  {


    
    if(this.notValidateInput())
      {
        console.log("error");
        
      }
    else
    {
      this.validateScore();
    this.matchService.setScore
    (
      {
        match_id:this.matchId,
        defaultBy:this.getDefaultStatus(),
        retiredBy:this.getRetiredStatus(),
        teamOneSetScore:
        {
            setScores:[this.setOne.team1Score,this.setTwo.team1Score,this.setThree.team1Score,]
        }
        ,teamTwoSetScore:
          {
            setScores:[this.setOne.team2Score,this.setTwo.team2Score,this.setThree.team2Score,]
          }
      }
    ).pipe(first()).subscribe(
      (msg:any)=>{
        this.location.back();
      },(err)=>{
        this.location.back();
      } 
    );
    }
    
  }
  notValidateInput():boolean {
    //case 1 
    // only one set is entered 
    if(this.setTwo.team1Score == null || this.setTwo.team2Score == null)
      {
          if(this.isDefaultOrRetired() )
          {
            return false; 
          }
          return true;
      }
      //case 2 
      // two set is entered 
      else if(this.setThree.team1Score == null || this.setTwo.team2Score == null)
        {
          if(this.isDefaultOrRetired() || this.isLastSet())
            {
              return false; 
            }
            return true;
        }
      return false;
  }
  isLastSet(): boolean {
      var teamOnePoint:number = 0;
      var teamTwoPoint:number = 0;
      var setArray:MatchScore[] = [this.setOne,this.setTwo]
      var index:number = 0;
      while(index < setArray.length)
        {
          if(setArray[index].team1Score > setArray[index].team2Score)
            {
                teamOnePoint+= 1;
            }
            else
            {
              teamTwoPoint += 1;
            }
            index++;
        }
        return (teamOnePoint == 2 || teamTwoPoint == 2) ? true:false;
  }
  isDefaultOrRetired() {
    if(this.team1Default || this.team2Default || this.team1Retired || this.team2Retired){
      return true;
    }
    return false;
  }
  validateScore() {

    var setArray:MatchScore[] = [this.setOne,this.setTwo,this.setThree];
    var index:number = 0;
    while(index < setArray.length)
      {
        console.log("indes");
        
        if(setArray[index].team1Score == null)
          {
            setArray[index].team1Score = 0;
          }
          if(setArray[index].team2Score == null)
            {
              setArray[index].team2Score = 0;
            }
            index++;
      }
    
  }
  getRetiredStatus(): number {
    if(this.team1Retired)
      {
        return 1;
      }
      else if(this.team2Retired)
        {
          return 2;
        }
        return 0;
  }
  getDefaultStatus(): number {
    if(this.team1Default)
      {
        return 1;
      }
      else if(this.team2Default)
        {
          return 2;
        }
        return 0;
  }
  
  

  goToPage(pageName:string): void {
    this.router.navigate([`${pageName}`])
  }

  selectedNavItem(navItem: string): void {
    this.selectedNav = navItem; 
  }

  handleCheckboxChange(team: number, checkboxType: string): void {
    if (checkboxType === 'default') {
      if (team === 1) {
        this.team1Retired = false;
      } else {
        this.team2Retired = false;
      }
    } else {
      if (team === 1) {
        this.team1Default = false;
      } else {
        this.team2Default = false;
      }
    }
  }
  
}


interface scoreResponse
{
 
  winner :number,
  team1Point:number,
  team2Point:number,
  team1Rating:number,
  team2Rating:number

}