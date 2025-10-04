import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = '/api/auth';
  private tokenKey = 'jwt-token';
  private userRoleKey = 'user-role';

  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http
      .post(`${this.authUrl}/authenticate`, { email, password })
      .pipe(
        tap((res: any) => {
          localStorage.setItem(this.tokenKey, res.token);
          // localStorage.setItem(this.userRoleKey, res.role); // assuming backend returns role
          this.loggedIn.next(true);
        })
      );
  }

  register(email: string, password: string): Observable<any> {
    return this.http.post(`${this.authUrl}/register`, { email, password });
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userRoleKey);
    this.loggedIn.next(false);
  }
  getToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  setToken(token: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.tokenKey, token);
    }
  }

  getRole(): string | null {
    return localStorage.getItem(this.userRoleKey);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}
