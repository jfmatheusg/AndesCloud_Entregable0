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

    if (!request.headers.has('Content-Type')) {
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
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
        let data = {};
        if (error.status === 404) {
          data = {
            reason: 'El usuario no tiene eventos en el sistema',
            status: error.status
          };
        } else {
          data = {
              reason: error && error.error && error.error.reason ? error.error.reason : error.message,
              status: error.status
          };
        }

        this.errorDialogService.openDialog(data);
        return throwError(error);
      }));
  }
}
