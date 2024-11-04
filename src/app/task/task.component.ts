import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';
import { TaskService } from '../services/task.service';
import { Task } from '../interface/task.interface';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ConfirmdeletetaskComponent } from './confirmdeletetask/confirmdeletetask.component';
import { Router } from '@angular/router';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    CdkScrollable,
    MatDialogModule,
    HttpClientModule,
    MatSnackBarModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './task.component.html',
  styles: ``,
  providers: [TaskService],
})
export class TaskComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'taskId',
    'title',
    'description',
    'dueDate',
    'isCompleted',
    'actions',
  ];

  tasks: Task[] = [];
  dataSource = new MatTableDataSource<Task>();
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private taskService: TaskService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fillTasks();
    this.dataSource.filterPredicate = (data: Task, filter: string) => {
      return data.title.toLowerCase().includes(filter) || 
             data.description.toLowerCase().includes(filter);
    };
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fillTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource.sort = this.sort;
      this.dataSource.sort.sort({ id: 'taskId', start: 'desc', disableClear: false });
      },
      error: (err) => {
        console.error('Error fetching tasks: ', err);
      },
    });
  }

  openViewTaskDialog(task: Task) {
    console.log('View task: ', task);

    const dialogRef = this.dialog.open(ViewComponent, {
      data: task,
      width: '500px',
    });
  }

  openEditTaskDialog(task: Task) {
    const dialogRef = this.dialog.open(AddComponent, {
      data: task,
      width: '600px',
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.editTask({ ...task, ...result });
        this.fillTasks();
        this.dataSource.sort = this.sort;
        this.dataSource.sort.sort({ id: 'taskId', start: 'desc', disableClear: false });
      }
    });
  }

  confirmDeleteTask(task: Task): void {
    const dialogRef = this.dialog.open(ConfirmdeletetaskComponent, {
      width: '300px',
      data: { taskName: task.title }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteTask(task);
      }
    });
  }

  openAddTaskDialog() {
    const dialogRef = this.dialog.open(AddComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addTask(result);
      }
    });
  }

  addTask(newTask: Task): void {
    this.taskService.createTask(newTask).subscribe({
      next: (createdTask: Task) => {
        this.tasks.push(createdTask);
        this.dataSource.data = [...this.tasks];
        this.dataSource.sort = this.sort;
            this.dataSource.sort.sort({ id: 'taskId', start: 'desc', disableClear: false });

        this.snackBar.open('Saved sucessfully', 'Close', {
          duration: 5000,
          panelClass: ['success-snackbar']
        });
      },
      error: (err) => {
        this.snackBar.open('Error to save Task', 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar'],
        });
      },
    });
  }

  editTask (editedTask : Task ) : void {
    this.taskService.updateTask(editedTask).subscribe({
      next: (task) => {
        const index = this.tasks.findIndex(t => t.taskId === task.taskId);
      if (index !== -1) {
        this.tasks[index] = task;
        this.dataSource.data = [...this.tasks];
      }
      this.snackBar.open('Task updated successfully', 'Close', {
        duration: 5000,
        panelClass: ['success-snackbar'],
      });
    },
    error: (err) => {
      this.snackBar.open('Error updating task', 'Close', {
        duration: 5000,
        panelClass: ['error-snackbar'],
      });
    },
    });
  }

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(t => t.taskId !== task.taskId);
        this.dataSource.data = [...this.tasks];
        this.fillTasks();
        this.dataSource.sort = this.sort;
            this.dataSource.sort.sort({ id: 'taskId', start: 'desc', disableClear: false });
        this.snackBar.open('Task deleted successfully', 'Close', {
          duration: 5000,
          panelClass: ['success-snackbar']
        });
      },
      error: (err) => {
        this.snackBar.open('Error deleting task', 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar'],
        });
      },
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
