import { TestBed } from '@angular/core/testing';

import { ArttypeService } from './arttype.service';

describe('ArttypeService', () => {
  let service: ArttypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArttypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
