import { TestBed } from '@angular/core/testing';

import { QueryClient } from '@tanstack/angular-query-experimental';

import { LabelsService } from './labels.service';

describe('LabelsService', () => {
  let service: LabelsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QueryClient],
    });
    service = TestBed.inject(LabelsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
