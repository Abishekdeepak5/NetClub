export class Team{
    team_id: number=0;
    club_id: number=0;
    league_id: number=0;
    team_name: string='';
    court_id: number=0;
    points:number=0;
    rating:number=0;
}

export class LeagueTeam extends Team{
    court_name!:string;
    user_id!:number;
}

export class TeamDoubles extends Team{
    player1!:number;
    player2!:number;
}

export class standingDetail{
    team_id!:number;
    team_name!:string;
    average_point!:any;
    average_rating!:any;
  }