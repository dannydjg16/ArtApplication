import { TestBed } from '@angular/core/testing';

import { LocationTypeService } from './locationtype.service';

describe('LocationtypeService', () => {
  let service: LocationTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
