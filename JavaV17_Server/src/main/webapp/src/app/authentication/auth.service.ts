import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = '/api/auth';
  private tokenKey = 'jwt-token';
  private userRoleKey = 'user-role';

  private loggedIn = new BehaviorSubject<boolean>(false);

  private userEmailKey = 'user-email';
  private userEmail = new BehaviorSubject<string | null>(null);

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.loggedIn.next(this.hasToken());
    if (
      isPlatformBrowser(this.platformId) &&
      typeof localStorage !== 'undefined'
    ) {
      const email = localStorage.getItem(this.userEmailKey);
      this.userEmail.next(email);
    }
  }

  login(email: string, password: string): Observable<any> {
    return this.http
      .post(`${this.authUrl}/authenticate`, { email, password })
      .pipe(
        tap((res: any) => {
          if (
            isPlatformBrowser(this.platformId) &&
            typeof localStorage !== 'undefined'
          ) {
            localStorage.setItem(this.tokenKey, res.token);
            localStorage.setItem(this.userEmailKey, email);
          }
          this.userEmail.next(email);
          this.loggedIn.next(true);
        })
      );
  }

  register(email: string, password: string): Observable<any> {
    return this.http.post(`${this.authUrl}/register`, { email, password });
  }

  logout(): void {
    if (
      isPlatformBrowser(this.platformId) &&
      typeof localStorage !== 'undefined'
    ) {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.userRoleKey);
      localStorage.removeItem(this.userEmailKey);
    }
    this.userEmail.next(null);
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

  getUserEmail(): Observable<string | null> {
    return this.userEmail.asObservable();
  }
  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  private hasToken(): boolean {
    if (
      isPlatformBrowser(this.platformId) &&
      typeof localStorage !== 'undefined'
    ) {
      return !!localStorage.getItem(this.tokenKey);
    }
    return false;
  }
}
