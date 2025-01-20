import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Court } from '../models/court.model';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import {USER_KEY,TOKEN_KEY,EMAIL_KEY} from '../contants/data-model';

import { BehaviorSubject } from 'rxjs';

@Injectable({
 providedIn: 'root',
})
export class CourtService{
  constructor(private http: HttpClient, private router: Router) { }
  courtDetails: BehaviorSubject<Court> = new BehaviorSubject(new Court());
  createCourt(court:Court){
    const headers=this.getHeader();
    return this.http.post<Court>(`${environment.myurl}/api/Court/action`, court, { headers });
  }

  getCourts(){
    const headers=this.getHeader();
    return this.http.get<Court[]>(`${environment.myurl}/api/Court/action`, { headers });
  }

  getHeader():HttpHeaders{
    const tokenKey=localStorage.getItem(TOKEN_KEY)?.toString();
    return new HttpHeaders({
      'Authorization': 'Bearer ' +tokenKey,
      'Content-Type': 'application/json',
    });
  }
}
