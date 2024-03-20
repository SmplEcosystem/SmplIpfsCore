import { TestBed } from '@angular/core/testing';

import { IpfsCoreService } from './ipfs-core.service';

describe('IpfsCoreService', () => {
  let service: IpfsCoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IpfsCoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
