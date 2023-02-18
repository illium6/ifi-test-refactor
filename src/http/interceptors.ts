import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';
import { FirstSourceInterceptor } from './first-source.interceptor';
import { SecondSourceInterceptor } from './second-source.interceptor';
import { ThirdSourceInterceptor } from './third-source.interceptor';

export const INTERCEPTORS: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: FirstSourceInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: SecondSourceInterceptor,
    multi: true,
  },
  // {
  //   provide: HTTP_INTERCEPTORS,
  //   useClass: ThirdSourceInterceptor,
  //   multi: true,
  // },
];
