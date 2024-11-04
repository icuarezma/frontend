import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmdeletetask',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './confirmdeletetask.component.html',
  styleUrl: './confirmdeletetask.component.css'
})
export class ConfirmdeletetaskComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmdeletetaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { taskName: string }
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }

}
