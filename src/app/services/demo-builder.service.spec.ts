import { TestBed } from '@angular/core/testing';

import { DemoBuilderService } from './demo-builder.service';

describe('DemoBuilderService', () => {
  let service: DemoBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemoBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
