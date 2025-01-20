import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PointsAndRatingsService {
  pointsAndRatings$: any;

  constructor() { }

  calculatePointsAndRatings(team1Sets: number[], team2Sets: number[]): { team1Points: number, team2Points: number, team1Rating: number, team2Rating: number } {
    const team1Points = team1Sets.reduce((total, set) => total + set, 0);
    const team2Points = team2Sets.reduce((total, set) => total + set, 0);

    const team1Rating = team1Sets.filter(set => set !== 0).length;
    const team2Rating = team2Sets.filter(set => set !== 0).length;

    return { team1Points, team2Points, team1Rating, team2Rating };
  }
}