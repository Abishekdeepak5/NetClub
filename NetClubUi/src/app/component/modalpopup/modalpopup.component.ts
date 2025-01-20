import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modalpopup',
  templateUrl: './modalpopup.component.html',
  styleUrls: ['./modalpopup.component.css']
})
export class ModalpopupComponent {
  constructor(public dialogRef: MatDialogRef<ModalpopupComponent>) { }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
