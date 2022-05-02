import { TestBed } from '@angular/core/testing';

import { CoordinatorResolver } from './coordinator.resolver';

describe('CoordinatorResolver', () => {
  let resolver: CoordinatorResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CoordinatorResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
