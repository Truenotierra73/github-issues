import { TestBed } from '@angular/core/testing';

import { QueryClient } from '@tanstack/angular-query-experimental';

import { IssueService } from './issue.service';

describe('IssueService', () => {
  let service: IssueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QueryClient],
    });
    service = TestBed.inject(IssueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
