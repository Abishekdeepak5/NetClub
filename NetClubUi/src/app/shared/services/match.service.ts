import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Court } from '../models/court.model';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import {USER_KEY,TOKEN_KEY,EMAIL_KEY} from '../contants/data-model';

import { BehaviorSubject } from 'rxjs';
import { MatchGetScore, MatchResponse, MatchScore } from '../models/match.model';

@Injectable({
 providedIn: 'root',
})
export class MatchService{
  constructor(private http: HttpClient, private router: Router) { }
  setScore(score:MatchResponse){
    const headers=this.getHeader();
    console.log(score);
    // return this.http.get('');
    return this.http.put<any>(`${environment.myurl}/api/Match/SaveScore/SaveScore`, score, { headers });
  }
//   api/Match/GetMatchScoreSummary?match_id=8
  getScore(matchId:number){
    const headers=this.getHeader();
    return this.http.get<MatchGetScore>(`${environment.myurl}/api/Match/GetMatchScoreSummary?match_id=${matchId}`, { headers });
  }
  getLeagueScores(leagueId:number){
    const headers=this.getHeader();
    return this.http.get<MatchGetScore[]>(`${environment.myurl}/api/Match/GetLeagueScores?league_id=${leagueId}`, { headers });
  }

  getHeader():HttpHeaders{
    const tokenKey=localStorage.getItem(TOKEN_KEY)?.toString();
    return new HttpHeaders({
      'Authorization': 'Bearer ' +tokenKey,
      'Content-Type': 'application/json',
    });
  }
}
