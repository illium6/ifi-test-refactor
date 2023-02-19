import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { books } from './data/books-source-third';
import { SourceName } from '../models/source-wrapper-factory';

@Injectable()
export class ThirdSourceInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url === '/third-book-source') {
      const response = new HttpResponse({
        body: { type: SourceName.THIRD, books },
        status: 200,
      });

      return of(response);
    } else {
      return next.handle(req);
    }
  }
}
