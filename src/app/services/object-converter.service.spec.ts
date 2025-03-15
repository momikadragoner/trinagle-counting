import { TestBed } from '@angular/core/testing';

import { ObjectConverterService } from './object-converter.service';

describe('ObjectConverterService', () => {
  let service: ObjectConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjectConverterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
