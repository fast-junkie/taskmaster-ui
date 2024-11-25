import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private http: HttpClient) {}

  // getTasks()
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${API_URL}/tasks`);
  }

  // addTask()
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${API_URL}/tasks`, { ...task });
  }

  // updateTask()
  updateTask(task: Task): Observable<Object> {
    return this.http.put(`${API_URL}/tasks/${task.id}`, { ...task });
  }

  // deleteTask()
  deleteTask(id: number): Observable<Object>  {
    return this.http.delete(`${API_URL}/tasks/${id}`);
  }
}
