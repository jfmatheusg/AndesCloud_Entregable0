import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {ErrorRestService} from '../services/error-rest/error-rest.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  constructor(public errorDialogService: ErrorRestService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token: string = localStorage.getItem('token');
    if (token) {
      request = request.clone({ headers: request.headers.set('Authorization', 'Token ' + token) });
    }

    request = request.clone({ headers: request.headers.set('Accept', 'application/json') });


    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if ([400, 401].indexOf(error.status) != -1) {
          return throwError(error);
        }
        return throwError(error);
      }));
  }
}
