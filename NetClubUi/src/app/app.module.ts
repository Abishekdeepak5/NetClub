import { NgModule } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CardModule } from 'primeng/card';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { CreateClubComponent } from './component/create-club/create-club.component';
import { JoinClubComponent } from './component/join-club/join-club.component';
import { TableComponent } from './component/table/table.component';;
import { CommonModule } from '@angular/common';
import { ModalpopupComponent } from './component/modalpopup/modalpopup.component';
import { HomeContentComponent } from './component/home-content/home-content.component';
import { MyClubsContentComponent } from './component/my-clubs-content/my-clubs-content.component';
import { TennisContentComponent } from './component/tennis-content/tennis-content.component';
import { RegisteredClubContentsComponent } from './component/registered-club-contents/registered-club-contents.component';
import { ScoreComponent } from './component/score/score.component';
import { DisplayScoreComponent } from './component/display-score/display-score.component';
import { DisplayLeagueComponent } from './components/display-league/display-league.component';
import { CoreService } from './shared/services/core.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { CustomFilterPipe } from './shared/Pipes/custom-filter.pipe';
import { SidenavbarComponent } from './components/sidenavbar/sidenavbar.component';
import { LoaderComponent } from './component/loader/loader.component';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CourtDropdownComponent } from './components/court-dropdown/court-dropdown.component';
// import { LoaderComponent } from './component/loader/loader.component';

  @NgModule({
    declarations: [
      AppComponent,
      JoinClubComponent,
      TableComponent,
      ModalpopupComponent,
      HomeContentComponent,
      MyClubsContentComponent,
      TennisContentComponent,
      RegisteredClubContentsComponent,
      ScoreComponent,
      DisplayScoreComponent,
      DisplayLeagueComponent,
      NavbarComponent,
      ButtonsComponent,
      LoaderComponent,
    
    ],
    imports: [
      HomeComponent,
      BrowserModule,
      AppRoutingModule,  
      HttpClientModule,
      MatToolbarModule,
      MatIconModule,
      MatButtonModule,
      CardModule,
      MatCardModule,
      MatTableModule,
      FormsModule,CommonModule,
    SidenavbarComponent,MessagesModule, BrowserAnimationsModule

      
    ],
    exports: [
      HomeComponent, // Export the CustomFilterPipe
    ],
    providers: [CoreService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
