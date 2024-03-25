import { TestBed } from '@angular/core/testing';

import { OrbitDbCoreService } from './orbit-db-core.service';

describe('OrbitDbCoreService', () => {
  let service: OrbitDbCoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrbitDbCoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
