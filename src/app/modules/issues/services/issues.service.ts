import { Injectable } from '@angular/core';

import {
  CreateQueryResult,
  injectQuery,
} from '@tanstack/angular-query-experimental';

import { getIssues } from '../actions';

import { GitHubIssue } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class IssuesService {
  issuesQuery: CreateQueryResult<GitHubIssue[], Error> = injectQuery(() => ({
    queryKey: ['labels'],
    queryFn: () => getIssues(),
  }));
}
