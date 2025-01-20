import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClubModel, MyClub, RegisteredClub ,ClubMember} from '../models/club.model';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import {USER_KEY,TOKEN_KEY,EMAIL_KEY} from '../contants/data-model';

import { BehaviorSubject } from 'rxjs';
@Injectable({
 providedIn: 'root',
})
export class ClubService{
  clubDetails: BehaviorSubject<ClubModel> = new BehaviorSubject(new ClubModel());
  myClubDetails: BehaviorSubject<MyClub> = new BehaviorSubject(new MyClub());
  regClubDetails: BehaviorSubject<RegisteredClub> = new BehaviorSubject(new RegisteredClub());
  listOfClub:MyClub[]=[];
  isNewClub:boolean=true;
  constructor(private http: HttpClient, private router: Router) { }
  selectedClub$ = this.myClubDetails.asObservable();
  selectedRegClub$=this.regClubDetails.asObservable();
  
  createClub(club:ClubModel){
    const headers=this.getHeader();
    return this.http.post<ClubModel>(`${environment.myurl}/api/Club/CreateClub`, club, { headers });
  }
  joinClub(club_label:string){
    const headers=this.getHeader();
    return this.http.post<ClubModel>(`${environment.myurl}/api/Club/JoinClub?club_label=${club_label}`, null,{headers} );
  }

  getMyClub(): Observable<MyClub[]> {
      const headers=this.getHeader();
      return this.http.get<MyClub[]>(`${environment.myurl}/api/Club/MyClubs`,{headers});
  }
  getRegisterClub(): Observable<RegisteredClub[]> {
    const headers=this.getHeader();
    return this.http.get<RegisteredClub[]>(`${environment.myurl}/api/Club/RegisteredClubs`,{headers});
    }
  getClubMembers(club_id:number):Observable<ClubMember[]>{
    const headers=this.getHeader();
    console.log(club_id);
    return this.http.get<ClubMember[]>(`${environment.myurl}/api/Club/ClubMembers?club_id=${club_id}`,{headers});
  }

  clubInvitation(email:string,url:string){
    const headers=this.getHeader();
    return this.http.post<string>(`${environment.myurl}/api/Club/ClubInvitation?url=${encodeURIComponent(url)}&email=${encodeURIComponent(email)}` ,{ headers }); 
  }

  getClubById(club_id:number){
    const headers=this.getHeader();
    return this.http.get<ClubModel>(`${environment.myurl}/api/Club/getClubById?club_id=${club_id}`,{headers});
  }

  getHeader():HttpHeaders{
    const tokenKey=localStorage.getItem(TOKEN_KEY)?.toString();
    return new HttpHeaders({
      'Authorization': 'Bearer ' +tokenKey,
      'Content-Type': 'application/json',
    });
  }

  setMyClub(myclub:MyClub){
    this.myClubDetails.next(myclub);
    this.router.navigate(['/club/'+myclub.id]);
    // this.router.navigate(['/regClub/'+myclub.id]);
  }

  setRegClub(club:RegisteredClub){
    this.regClubDetails.next(club);
    // this.router.navigate(['/regLeague']);
    this.router.navigate(['/regClub/'+club.id]);
  }
}
