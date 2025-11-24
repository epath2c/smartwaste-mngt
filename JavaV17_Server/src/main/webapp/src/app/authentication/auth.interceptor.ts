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
  private isHandlingSessionExpiry = false;

  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    let cloned = req;
    if (token) {
      cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
      return next.handle(cloned).pipe(
        catchError((error: HttpErrorResponse) => {
          // Check for 401 Unauthorized (token expired or invalid)
          if (
            (error.status === 401 || error.status === 403) &&
            !this.isHandlingSessionExpiry
          ) {
            this.isHandlingSessionExpiry = true;
            // Optionally read message from server
            const msg =
              error.error?.message ||
              'Your session has expired. Please log in again.';

            // Show message
            alert(msg);

            // Clear token and redirect to login
            this.authService.logout();
            const currentUrl = this.router.url;
            this.router.navigate(['/login'], {
              queryParams: { returnUrl: currentUrl },
            });
          }

          return throwError(() => error);
        })
      );
    }

    return next.handle(req);
  }
}
