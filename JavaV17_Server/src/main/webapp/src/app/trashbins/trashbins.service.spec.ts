import { TestBed } from '@angular/core/testing';

import { TrashbinsService } from './trashbins.service';

describe('TrashbinsService', () => {
  let service: TrashbinsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrashbinsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
