import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../interface/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiURL = 'https://localhost:7282/api/Tasks';

  constructor(private http: HttpClient) { }

  getTasks() : Observable<Task[]>{
    return this.http.get<Task[]>(this.apiURL);
  }

  createTask (task: Task) : Observable<Task> {
    return this.http.post<Task>(this.apiURL, task);
  }

  updateTask(task: Task): Observable<Task> {
    const updateURL = `${this.apiURL}/${task.taskId}`;
    return this.http.put<Task>(updateURL ,task);
  }

  deleteTask(task: Task): Observable<void> {
    const deleteURL = `${this.apiURL}/${task.taskId}`;
    return this.http.delete<void>(deleteURL);
  }

}
