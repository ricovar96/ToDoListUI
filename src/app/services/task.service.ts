import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
  id: number;
  taskName: string;
  taskDescription: string;
  endDate: string;
  isUrgent: boolean;
  levelImportance: number;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'https://todolistricovar96-f4duczhpavfwa2bw.canadacentral-01.azurewebsites.net/api/ToDoList';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  addTask(task: any): Observable<any> {
    return this.
    http.post(`${this.apiUrl}`, task);
  }

  updateTask(id: number, task: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, task);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
