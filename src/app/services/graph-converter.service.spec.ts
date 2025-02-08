import { TestBed } from '@angular/core/testing';

import { GraphConverterService } from './graph-converter.service';

describe('GraphConverterService', () => {
  let service: GraphConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphConverterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
