export class LeagueModel{
    id:number=0;
    name:string='';
    club_id:number=0;
    start_date:string='2024-04-01T23:49';
    end_date:string='2024-04-10T23:49';
    league_type_id:number=1;
    schedule_type_id:number=1;
    number_of_teams:number=0;
    number_of_teams_playoffs:number=0;
    playoff_start_date:string='2024-04-04T23:49';
    playoff_end_date:string='2024-04-08T23:49';
    playoff_type_id:number=0;
    registration_start_date:string='2024-04-01T23:49';
    registration_end_date:string='2024-04-05T23:49';
}

export class userLeague extends LeagueModel{
    is_join!:boolean;
} 