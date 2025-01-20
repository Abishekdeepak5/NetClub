import { Injectable, NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { CreateClubComponent } from './component/create-club/create-club.component';
import { JoinClubComponent } from './component/join-club/join-club.component';
import { ModalpopupComponent } from './component/modalpopup/modalpopup.component';
import { TableComponent } from './component/table/table.component';
import { CreateLeagueComponent } from './components/my-league/create-league/create-league.component';
import { ScoreComponent } from './component/score/score.component';
import { DisplayScoreComponent } from './component/display-score/display-score.component';
import { LeagueComponent } from './components/my-league/league/league.component';
import { LeagueTeamComponent } from './components/my-league/league-team/league-team.component';
import { RegisterLeagueComponent } from './components/register-leagues/register-league/register-league.component';
import { JoinLeagueComponent } from './components/register-leagues/join-league/join-league.component';
// import {RegisterLeagueTeamComponent} from './components/register-leagues/register-league-team/register-league-team.component';
import { DisplayLeagueComponent } from './components/display-league/display-league.component';
import { AuthGuard } from './shared/services/auth-guard';
import { CoreService } from './shared/services/core.service';
import {CreateCourtComponent} from './components/court/create-court/create-court.component';

const routes: Routes = [
  { path: 'createclub',canActivate:[AuthGuard],component: CreateClubComponent},
  { path: 'joinclub',canActivate:[AuthGuard],component: JoinClubComponent},
  { path: 'info',canActivate:[AuthGuard], component: ModalpopupComponent},
  {path:'tableitem',canActivate:[AuthGuard],component:TableComponent},
  {path:'createLeague/:clubId',canActivate:[AuthGuard],component:CreateLeagueComponent},
  {path:'display-league',canActivate:[AuthGuard],component:DisplayLeagueComponent},
  {path:'score',canActivate:[AuthGuard],component:ScoreComponent},
  {path:'score/:matchId',canActivate:[AuthGuard],component:ScoreComponent},
  {path:'score/:matchId/team1/:team1/team2/:team2',canActivate:[AuthGuard],component:ScoreComponent},
  {path: 'display-score',canActivate:[AuthGuard],component:DisplayScoreComponent},
  {path:'',redirectTo: '/home',pathMatch:'full'},
  {path:'home',canActivate:[AuthGuard],component: HomeComponent},
  {path:'home/:email/joinclub/:clubCode',canActivate:[AuthGuard],component: HomeComponent},

  { path: 'register', component:RegisterComponent ,loadChildren: () => import('./components/register/register.module').then(m => m.RegisterModule) },

  { path: 'login', component:LoginComponent,loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule) },
  { path: 'user/:email', component:LoginComponent,loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule) },

  {path:'myLeague',canActivate:[AuthGuard],component:LeagueComponent},
  // {path:'club/:clubId',canActivate:[AuthGuard],component:LeagueComponent},
  {path:'club/:clubId',canActivate:[AuthGuard],component:RegisterLeagueComponent},

  {path:'club/:clubId/league/:leagueId',canActivate:[AuthGuard],component:LeagueTeamComponent},
  {path:'regClub/:clubId/league/:leagueId',canActivate:[AuthGuard],component:LeagueTeamComponent},
  {path:'regClub/:clubId',canActivate:[AuthGuard],component:RegisterLeagueComponent},
  {path:'home/:email/club/:clubId/league/:leagueId',canActivate:[AuthGuard],component:RegisterLeagueComponent},
  {path:'home/:email/club/:clubId/league/:leagueId/joinFriend/:friendId',canActivate:[AuthGuard],component:RegisterLeagueComponent},
  

  {path:'createCourt',canActivate:[AuthGuard],component:CreateCourtComponent},
  {path:'leagueTeam',canActivate:[AuthGuard],component:LeagueTeamComponent},
  {path:'regLeague',canActivate:[AuthGuard],component:RegisterLeagueComponent},
  {path:'joinLeague',canActivate:[AuthGuard],component:JoinLeagueComponent},
  // { path: '',   redirectTo: '/home', pathMatch: 'full'},
  // { path: '',   canActivate:[AuthGuard],component: HomeComponent},
  // canActivate:[AuthGuard],component: HomeComponent
  {path:'**',redirectTo: '/home'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers:[CoreService],
  exports: [RouterModule],
})
export class AppRoutingModule { }
