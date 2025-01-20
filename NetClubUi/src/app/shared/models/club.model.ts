export class ClubModel
{
  id:number=0;
  club_name:string='GCETLY';
  address1:string='Marshal nagar Tirunelveli' ;
  address2:string='Tirunelveli' ;
  city:string='Tirunelveli' ;
  state:string='TN' ;
  zip:string='627007' ;
  created_by:string='Abishek' ;
  club_label:string='abcxyz' ;
  total_league:number= 0;
  active_league:number= 0;
  teams:number=0;
  registered_date: string='2024-02-10T15:02:06.440Z';
}


export class MyClub{
    id!: number;
    name!: string;
    totalLeagues!: number;
    teams!: number;
    activeLeagues!: number;
    club_label!:string;
}
export class RegisteredClub{
    id!:number;
    club_name!: string;
    created_by!: string;
    join_date!: number;
    club_label!:string;
}
export class ClubMember {
  user_id!:number;
  first_name!: string;
  last_name!: string;
  email!: string;
  phone_number!: string;
  gender!: string;
  join_date!: string;
}