import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserResponse {
  id: number;
  username: string;
  correo: string;
  contrasena: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  usuarioLogueado: any = null;
  // 1. Dejamos la URL base limpia sin variables sueltas
  private apiUrl = 'https://proyecto-eventos-familia.onrender.com/api/usuarios'; 

  constructor(private http: HttpClient) {}

  // 2. Recibe el correo aquí para armar la ruta exacta
  login(correo: string): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.apiUrl}/${correo}`);
  }

  registrar(newUser: { username: string; correo: string; contrasena: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, newUser);
  }
}