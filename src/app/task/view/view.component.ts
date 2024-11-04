import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Task } from '../../interface/task.interface';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatDialogModule],
  templateUrl: './view.component.html',
  styles: ``
})
export class ViewComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Task){}

}
