import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClubModel, MyClub, RegisteredClub } from '../models/club.model';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import {USER_KEY,TOKEN_KEY,EMAIL_KEY} from '../contants/data-model';

import { BehaviorSubject } from 'rxjs';
import { LeagueModel, userLeague } from '../models/league.model';
import { Match } from '../models/match.model';
import { LeagueTeam, Team, TeamDoubles } from '../models/team.model';

@Injectable({
 providedIn: 'root',
})
export class LeagueService{
  getSavedLeagues(): LeagueModel[] {
    throw new Error('Method not implemented.');
  }
  saveLeague(League: LeagueModel) {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient, private router: Router) { }
  LeagueDetails: BehaviorSubject<LeagueModel> = new BehaviorSubject(new LeagueModel());
  selectedLeague$ = this.LeagueDetails.asObservable();
  createLeague(league:LeagueModel){
    const headers=this.getHeader();
    return this.http.post<LeagueModel>(`${environment.myurl}/api/League/CreateLeague`, league, { headers });
  }

  myLeague(club_id:number){
    const headers=this.getHeader();
    return this.http.get<userLeague[]>(`${environment.myurl}/api/League/GetClubLeagues?club_Id=${club_id}`, { headers });
  }
  TeamToJoinLeague(myteam:Team){
    console.log(myteam);
    const headers=this.getHeader();
    return this.http.post<string>(`${environment.myurl}/api/Team/CreateTeam`,myteam,{ headers });
  }

  getLeagueTeams(league_id:number){
    const headers=this.getHeader();
    return this.http.get<LeagueTeam[]>(`${environment.myurl}/api/League/GetLeagueTeams?league_id=${league_id}`, { headers });     
  }

  joinTeamDoubles(team:TeamDoubles){
    const headers=this.getHeader();
    return this.http.post<string>(`${environment.myurl}/api/Team/JoinDoubles`,team ,{ headers });     
  }

  getSchedule(leagueId:number){
    const headers=this.getHeader();
    return this.http.get<Match[]>(`${environment.myurl}/api/Match/GetSchedule?league_id=${leagueId}`,{ headers });     
  }
  getLeagueById(leagueId:number){
    const headers=this.getHeader();
    return this.http.get<LeagueModel>(`${environment.myurl}/api/League/getLeagueById?league_id=${leagueId}`,{ headers });     
  }
  // League/ScheduleMatch?clubId=0&leagueId=0
  ScheduleMatch(clubId:number,leagueId:number){
    const headers=this.getHeader();
    return this.http.get<any>(`${environment.myurl}/api/Match/ScheduleMatch?clubId=${clubId}&leagueId=${leagueId}`,{ headers });     
  }
  GetMyMatch(user_id:number){
    const headers=this.getHeader();
    // api/Match/GetMyMatches?user_id=94
    return this.http.get<any>(`${environment.myurl}/api/Match/GetMyMatches?user_id=${user_id}`,{ headers })
  }
  sendInviteEmail(email:string,url:string){
    const headers=this.getHeader();
    return this.http.get<string>(`${environment.myurl}/api/League/InvitePlayer?email=${encodeURIComponent(email)}&url=${encodeURIComponent(url)}` ,{ headers }); 
  }
  getHeader():HttpHeaders{
    const tokenKey=localStorage.getItem(TOKEN_KEY)?.toString();
    return new HttpHeaders({
      'Authorization': 'Bearer ' +tokenKey,
      'Content-Type': 'application/json',
    });
  }
  setLeague(league:LeagueModel,isMyClub:boolean){
    this.LeagueDetails.next(league);
    if(isMyClub){
      this.router.navigate(['/club/'+league.club_id+'/league/'+league.id]);
    }
    else{
      this.router.navigate(['/regClub/'+league.club_id+'/league/'+league.id]);

    }
  }
}
