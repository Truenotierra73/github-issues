import { TestBed } from '@angular/core/testing';

import { QueryClient } from '@tanstack/angular-query-experimental';

import { IssuesService } from './issues.service';

describe('IssuesService', () => {
  let service: IssuesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QueryClient],
    });
    service = TestBed.inject(IssuesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
