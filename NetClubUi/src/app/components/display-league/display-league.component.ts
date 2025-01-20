import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyClub, RegisteredClub } from '../../shared/models/club.model';
import { ClubService } from '../../shared/services/club.service';

@Component({
  selector: 'app-display-league',
  templateUrl: './display-league.component.html',
  styleUrls: ['./display-league.component.css']
})
export class DisplayLeagueComponent implements OnInit {
  selectedNavItem: string = 'League';
clubName!: string;
leagueName!: string;
startDate!: Date;
endDate!: Date;
regStartDate!:Date;
regEndDate!:Date;



  constructor(private router: Router,private clubService:ClubService) { }
  clubs: any[] = [ 
    { League: 'Club 1', start: 'march', End: 'april', Teams:'2',Matches:'3' },
    { League: 'Club 2', start: 'april', End: 'may', Teams:'2',Matches:'5' },
    { League: 'Club 3', start: 'may', End: 'june', Teams:'3',Matches:'4' }
  ];

  ngOnInit(): void {
    this.clubService.getMyClub().subscribe((myclub:MyClub[]) => {
      this.myClubs =myclub;
  });
  this.clubService.getRegisterClub().subscribe((regclub:RegisteredClub[]) => {
      this.regClubs =regclub;
  });
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.clubName = navigation.extras.state['clubName'];
      this.leagueName = navigation.extras.state['leagueName'];
      this.startDate = navigation.extras.state['startDate'];
      this.endDate = navigation.extras.state['endDate'];
      this.regStartDate = navigation.extras.state['regStartDate'];
      this.regEndDate = navigation.extras.state['regEndDate'];


    } else {

    }
  }
  
  showMyClubsContent(): void {
    this.selectedNavItem = 'myClubs'; 
  }
  showLeagueContent(): void {
    this.selectedNavItem = 'League'; 
  }
  showTennisContent(): void {
    this.selectedNavItem = 'Tennis'; 
  }
  showRegisteredContent(): void {
    this.selectedNavItem = 'RegisteredClubs'; 
  }
  
  sidebarVisible: boolean = false; 

  myClubs:MyClub[]=[];
  regClubs:RegisteredClub[]=[];

  selectClub:any;
}
