import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { books } from './data/books-source-first';

@Injectable()
export class FirstSourceInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url === '/first-book-source') {
      const response = new HttpResponse({
        body: books,
        status: 200,
      });

      return of(response).pipe(delay(3000));
    } else {
      return next.handle(req);
    }
  }
}
