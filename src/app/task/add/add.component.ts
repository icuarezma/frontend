import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DATE_LOCALE,
  MatNativeDateModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../interface/task.interface';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'es-ES',
    },
    provideNativeDateAdapter(),
  ],
  templateUrl: './add.component.html',
  styles: ``,
})
export class AddComponent implements OnInit {
  taskForm: FormGroup;
  isEditMode : boolean;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      isCompleted: [false],
    });
    this.isEditMode = !!this.data;
  }

  ngOnInit() {
    if(this.data){
      this.taskForm.patchValue(this.data);
    }
  }

  onSubmit(){
    if(this.taskForm.valid){
      this.dialogRef.close(this.taskForm.value);
    }
  }

  onCancel() : void{
    this.dialogRef.close();
  }
}
