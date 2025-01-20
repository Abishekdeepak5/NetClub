import { Component,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-display-score',
  templateUrl: './display-score.component.html',
  styleUrls: ['./display-score.component.css']
})
export class DisplayScoreComponent {

  tableData = [
    { team: 'Team 1', set1: 'Team 1', set2: 'Team 2', set3: 'Team 1' }, // Sample data
    { team: 'Team 2', set1: 'Team 2', set2: 'Team 1', set3: 'Team 2' }
  ];
  team1SetsWon: number = 0;
  team2SetsWon: number = 0;
  team1Rating: number = 0; // Initial ratings (replace with actual values)
  team2Rating: number = 0;
  winner: string = ''; // Added to store the winner team name
  averageScorePerMatch: number = 0; // Added to calculate average score

  calculateScore(): void {
    this.team1SetsWon = 0;
    this.team2SetsWon = 0;

    // Iterate through table data to calculate set wins
    this.tableData.forEach(rowData => {
      if (rowData.set1 === 'Team 1') {
        this.team1SetsWon++;
      } else if (rowData.set1 === 'Team 2') {
        this.team2SetsWon++;
      }
      // Similar logic for set2 and set3
    });

    // Determine winner and update ratings
    if (this.team1SetsWon > this.team2SetsWon) {
      this.winner = 'Team 1';
      this.team1Rating += 14; // Winner rating change
      this.team2Rating -= 8;  // Loser rating change
    } else if (this.team2SetsWon > this.team1SetsWon) {
      this.winner = 'Team 2';
      this.team2Rating += 14;
      this.team1Rating -= 8;
    } else {
      this.winner = 'Tie';
      console.log('Match Tied!');  // Example for logging tie
    }

    // Calculate average score per match (adjust if needed)
    const totalScore = this.team1Rating + this.team2Rating;
    this.averageScorePerMatch = totalScore / this.tableData.length;
  }
}
