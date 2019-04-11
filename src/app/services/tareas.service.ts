import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API } from '../../config/app.config';
import { Tareas } from '../models/tareas.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  constructor(public http: HttpClient) { }

  // Trae toas las tareas
  getAllTasks(): Observable<any> {
    return this.http.get(API.url + '/tareas', httpOptions).pipe(
      map(res => {
        return res;
      }, err => {
        return err;
      })
    );
  }

  // Guarda las tareas en BD
  saveTasks(task: Tareas): Observable<any> {
    return this.http.post(API.url + '/tareas', task, httpOptions).pipe(
      map(res => {
        return res;
      }, err => {
        return err;
      })
    );
  }

}
