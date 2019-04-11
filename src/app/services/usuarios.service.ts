import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { API } from '../../config/app.config';
import { Usuarios } from '../models/usuarios.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(public http: HttpClient) { }

  // Trae todos los usuarios
  getAllUsers(): Observable<any> {
    return this.http.get(API.url + '/usuarios', httpOptions).pipe(
      map(res => {
        return res;
      }, err => {
        return err;
      })
    );
  }

  // Guarda los usuarios en BD
  saveUsers(users: Usuarios): Observable<any> {
    return this.http.post(API.url + '/usuarios', users, httpOptions).pipe(
      map(res => {
        return res;
      }, err => {
        return err;
      })
    );
  }

}
