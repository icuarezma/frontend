import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private apiurl = 'https://localhost:7282/api/Users';
  constructor(private http: HttpClient, private router : Router) { }

  login(username: string, password: string): Observable<any> {
    return this.http.get<any>(`${this.apiurl}?username=${username}&password=${password}`);
  }

  logout() {
    this.router.navigate(['/login']);
  }

}
