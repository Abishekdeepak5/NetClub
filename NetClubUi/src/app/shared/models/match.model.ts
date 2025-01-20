export class Match {
    match_id!: number;
    league_id!:number;
    winning_team!:number;
    team1!: Team;
    team2!: Team;
    start_date!: string;
    end_date!: string;
    score!: number;
    venue!: string;
    team1_point!:number;
    team1_rating !:number;
    team2_point!:number; 
    team2_rating!:number;
    player1_id!:number;
    player2_id!:number;
  }
export class MyMatch extends Match{
  club_id!:number;
  team1_id!:number;
  team2_id!:number;
  point!:number;
  rating!:number;
  court_id!:number;
  isTeamOrder!:boolean;
}

  class Team {
    team_id!: number;
    team_name!: string;
  }
export class MatchTeam{
    matchId!:number;
    teamId1!:number;
    teamId2!:number;
    team2name!:string;
    point!:number;
    rating!:number;
    sets!:Score[];
    isChangeOrder!:boolean;
  }
export class MatchScore{
  matchId!: number;
  setNumber!: number;
  team1Score!: number;
  team2Score!: number;
}
export class MatchResponse
{
  match_id!: number;
  defaultBy!:number;
  retiredBy!:number;
  teamOneSetScore!:
  {
    setScores:number[];
  };
  teamTwoSetScore!:
  {
    setScores:number[];
  };
}
export class MatchGetScore{
    match_id!:number;
    league_id!:number;
    team1_id!:number;
    team2_id!:number;
    sets!:Score[];
}
class Score{
  set_number!:number;
  team1score!:number;
  team2score!:number;
}
// "sets": [
//   {
//     "set_number": 1,
//     "team1score": 10,
//     "team2score": 6
//   },
//   {
//     "set_number": 2,
//     "team1score": 8,
//     "team2score": 5
//   },
//   {
//     "set_number": 3,
//     "team1score": 3,
//     "team2score": 3
//   }
// ]
const jsonStr2=`[
  {"match_id":1,"team1":{"team_id":1  ,"team_name": "A"},"team2": {"team_id":2 ,"team_name": "B"}},
  {"match_id":2,"team1":{"team_id":2  ,"team_name": "B"},"team2": {"team_id":3,"team_name": "C"}},
  {"match_id":3,"team1":{"team_id":1  ,"team_name": "A"},"team2": {"team_id":3,"team_name": "C"}}
  ]`;
  const jsonStr1=`[
    {"match_id":1,"team1":{"team_id":1  ,"team_name": "A"},"team2": {"team_id":4 ,"team_name": "D"}},
    {"match_id":2,"team1":{"team_id":2  ,"team_name": "B"},"team2": {"team_id":5,"team_name": "E"}},
    {"match_id":3,"team1":{"team_id":1  ,"team_name": "A"},"team2": {"team_id":5,"team_name": "E"}},
    {"match_id":4,"team1":{"team_id":2  ,"team_name": "B"},"team2": {"team_id":3 ,"team_name": "C"}},
    {"match_id":5,"team1":{"team_id":5  ,"team_name": "E"},"team2": {"team_id":3 ,"team_name": "C"}},
    {"match_id":6,"team1":{"team_id":4  ,"team_name": "D"},"team2": {"team_id":2,"team_name": "B"}},
    {"match_id":7,"team1":{"team_id":1  ,"team_name": "A"},"team2": {"team_id":3,"team_name": "C"}},
    {"match_id":8,"team1":{"team_id":5  ,"team_name": "E"},"team2": {"team_id":4 ,"team_name": "D"}},
    {"match_id":9,"team1":{"team_id":1  ,"team_name": "A"},"team2": {"team_id":2 ,"team_name": "B"}},
    {"match_id":10,"team1":{"team_id":3  ,"team_name": "C"},"team2": {"team_id":4 ,"team_name": "D"}}
    ]`;
  // const jsonStr=`[
  //   {"match_id":1,"team1":{"team_id":1  ,"team_name": "A"},"team2": {"team_id":4 ,"team_name": "D"}},
  //   {"match_id":2,"team1":{"team_id":2  ,"team_name": "B"},"team2": {"team_id":5,"team_name": "E"}},
  //   {"match_id":3,"team1":{"team_id":3  ,"team_name": "C"},"team2": {"team_id":6,"team_name": "F"}},
  //   {"match_id":4,"team1":{"team_id":1  ,"team_name": "A"},"team2": {"team_id":5 ,"team_name": "E"}},
  //   {"match_id":5,"team1":{"team_id":4  ,"team_name": "D"},"team2": {"team_id":6 ,"team_name": "F"}},
  //   {"match_id":6,"team1":{"team_id":2  ,"team_name": "B"},"team2": {"team_id":3,"team_name": "C"}},
  //   {"match_id":7,"team1":{"team_id":1  ,"team_name": "A"},"team2": {"team_id":6,"team_name": "F"}},
  //   {"match_id":8,"team1":{"team_id":5  ,"team_name": "E"},"team2": {"team_id":3 ,"team_name": "C"}},
  //   {"match_id":9,"team1":{"team_id":4  ,"team_name": "D"},"team2": {"team_id":2 ,"team_name": "B"}},
  //   {"match_id":10,"team1":{"team_id":1  ,"team_name": "A"},"team2": {"team_id":3 ,"team_name": "C"}},
  //   {"match_id":11,"team1":{"team_id":6  ,"team_name": "F"},"team2": {"team_id":2 ,"team_name": "B"}},
  //   {"match_id":12,"team1":{"team_id":5  ,"team_name": "E"},"team2": {"team_id":4 ,"team_name": "D"}},
  //   {"match_id":13,"team1":{"team_id":1  ,"team_name": "A"},"team2": {"team_id":2 ,"team_name": "B"}},
  //   {"match_id":14,"team1":{"team_id":3  ,"team_name": "C"},"team2": {"team_id":4 ,"team_name": "D"}},
  //   {"match_id":15,"team1":{"team_id":6  ,"team_name": "F"},"team2": {"team_id":5 ,"team_name": "E"}} 
  // ]`;
const jsonStr=`[
  {
    "match_id": 1,
    "team1": {
      "team_id": 1,
      "team_name": "A"
    },
    "team2": {
      "team_id": 3,
      "team_name": "C"
    },
    "start_date": "29-03-2024 11:57:00 PM",
    "end_date": "29-03-2024 11:57:00 PM",
    "score": 0,
    "venue": "st"
  },

  {
    "match_id":2 ,
    "team1": {
      "team_id":2 ,
      "team_name": "B"
    },
    "team2": {
      "team_id":4 ,
      "team_name": "D"
    },
    "start_date": "29-03-2024 11:57:00 PM",
    "end_date": "29-03-2024 11:57:00 PM",
    "score": 0,
    "venue": "st"
  },

  {
    "match_id": 3,
    "team1": {
      "team_id":1 ,
      "team_name": "A"
    },
    "team2": {
      "team_id":4 ,
      "team_name": "D"
    },
    "start_date": "29-03-2024 11:57:00 PM",
    "end_date": "29-03-2024 11:57:00 PM",
    "score": 0,
    "venue": "st"
  },

  {
    "match_id":4 ,
    "team1": {
      "team_id":3 ,
      "team_name": "C"
    },
    "team2": {
      "team_id": 2,
      "team_name": "B"
    },
    "start_date": "29-03-2024 11:57:00 PM",
    "end_date": "29-03-2024 11:57:00 PM",
    "score": 0,
    "venue": "st"
  },

  {
    "match_id":5 ,
    "team1": {
      "team_id":1 ,
      "team_name": "A"
    },
    "team2": {
      "team_id": 2,
      "team_name": "B"
    },
    "start_date": "29-03-2024 11:57:00 PM",
    "end_date": "29-03-2024 11:57:00 PM",
    "score": 0,
    "venue": "st"
  },

  {
    "match_id": 6,
    "team1": {
      "team_id": 4,
      "team_name": "D"
    },
    "team2": {
      "team_id":3 ,
      "team_name": "C"
    },
    "start_date": "29-03-2024 11:57:00 PM",
    "end_date": "29-03-2024 11:57:00 PM",
    "score": 0,
    "venue": "st"
  }

 
]`;
 export const Mymatch:Match[]=JSON.parse(jsonStr2);