import { TestBed } from '@angular/core/testing';

import { ThirdSourceInterceptor } from './third-source.interceptor';

describe('ThirdSourceInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ThirdSourceInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ThirdSourceInterceptor = TestBed.inject(ThirdSourceInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
