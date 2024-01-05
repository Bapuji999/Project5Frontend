import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, finalize, throwError } from 'rxjs';
import { LoaderService } from '../Loader/loader.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService  implements HttpInterceptor {
  constructor(
    private loaderService: LoaderService,
    private router: Router
    ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.showLoader();
    const modifiedRequest = req.clone({
      setHeaders: {
        'Authorization': 'Bearer ' + String(localStorage.getItem('token')),
        'Custom-Header': 'custom-value'
      }
    });
    return next.handle(modifiedRequest).pipe(
      delay(400),// this is for visualising loader
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          localStorage.clear();
          this.router.navigate(['/login']);
        }
        return throwError(() => error);;
      }),
      finalize(() =>this.loaderService.hideLoader())
    );
  }
}
