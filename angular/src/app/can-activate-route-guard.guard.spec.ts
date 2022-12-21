import { TestBed, async, inject } from '@angular/core/testing';

import { CanActivateRouteGuard } from './can-activate-route-guard.guard';

describe('CanActivateRouteGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanActivateRouteGuard]
    });
  });

  it('should ...', inject([CanActivateRouteGuard], (guard: CanActivateRouteGuard) => {
    expect(guard).toBeTruthy();
  }));
});
