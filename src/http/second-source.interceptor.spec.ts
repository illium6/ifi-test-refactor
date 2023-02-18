import { TestBed } from '@angular/core/testing';

import { SecondSourceInterceptor } from './second-source.interceptor';

describe('SecondSourceInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      SecondSourceInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: SecondSourceInterceptor = TestBed.inject(SecondSourceInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
