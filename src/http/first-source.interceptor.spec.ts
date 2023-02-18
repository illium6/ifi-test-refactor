import { TestBed } from '@angular/core/testing';

import { FirstSourceInterceptor } from './first-source.interceptor';

describe('FirstSourceInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      FirstSourceInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: FirstSourceInterceptor = TestBed.inject(FirstSourceInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
