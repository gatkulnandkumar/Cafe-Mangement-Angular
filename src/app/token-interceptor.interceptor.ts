import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs'; // Import Observable and throwError
import { catchError } from 'rxjs/operators'; // Import catchError
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let url = '';
    const token = localStorage.getItem('token');
    console.log("i get token here", token);
    console.log("request from interceptorrrrrr", request);
    console.log("reeuqstttt urllllll===", request.url);

    if (request.url.includes('/user/forgotPassword')) {
      console.log("beforeee handel", request);

      return next.handle(request);

      // request = request.clone({
      //   url: url + request.url,
      //   setHeaders: {
      //     'Accept': 'application/json',
      //   },
      // });
 
    }
    // if (!request.url.includes('/user/forgotPassword')) {
    else if (token) {
      console.log("beforeee handel elseeee iff", request);
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }
    // } 

    return next.handle(request).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          console.log("error url", err.url);
          if (err.status === 401 || err.status === 403 || err.status === 405) {
            if (this.router.url !== '/') {
              localStorage.clear();
              this.router.navigate(['/']);
            }
          }
        }
        return throwError(err);
      })
    );
  }
}
