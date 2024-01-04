import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, finalize } from 'rxjs';
import { LoaderService } from '../Loader/loader.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService  implements HttpInterceptor {
  constructor(private loaderService: LoaderService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.showLoader();
    const modifiedRequest = req.clone({
      setHeaders: {
        'Authorization': 'Bearer ' + String(localStorage.getItem('token')),
        'Custom-Header': 'custom-value'
      }
    });
    return next.handle(modifiedRequest).pipe(
      delay(600),
      finalize(() =>this.loaderService.hideLoader())
    );
  }
}
