import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    let cloned = req;
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
      return next.handle(cloned).pipe(
        catchError((error: HttpErrorResponse) => {
          // Check for 401 Unauthorized (token expired or invalid)
          if (error.status === 401) {
            // Optionally read message from server
            const msg =
              error.error?.message ||
              'Your session has expired. Please log in again.';

            // Show message
            alert(msg);

            // Clear token and redirect to login
            this.authService.logout();
            this.router.navigate(['/login']);
          }

          return throwError(() => error);
        })
      );
    }

    return next.handle(req);
  }
}
