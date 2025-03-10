import { TestBed } from '@angular/core/testing';

import {
  provideTanStackQuery,
  QueryClient,
} from '@tanstack/angular-query-experimental';

import { IssuesService } from './issues.service';

describe('IssuesService', () => {
  let service: IssuesService;
  let queryClient: QueryClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideTanStackQuery(new QueryClient())],
    });
    service = TestBed.inject(IssuesService);
    queryClient = TestBed.inject(QueryClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
