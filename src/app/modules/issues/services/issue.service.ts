import { inject, Injectable, signal, WritableSignal } from '@angular/core';

import {
  injectQuery,
  CreateQueryResult,
  QueryClient,
} from '@tanstack/angular-query-experimental';

import { getIssueByNumber, getIssueCommentsByNumber } from '../actions';

import { GitHubIssue } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  private readonly queryClient: QueryClient = inject(QueryClient);
  private readonly issueNumber: WritableSignal<string> = signal<string>('');

  set issue(id: string) {
    this.issueNumber.set(id);
  }

  get issue(): string {
    return this.issueNumber();
  }

  getIssueQuery(): CreateQueryResult<GitHubIssue, Error> {
    return injectQuery(() => ({
      queryKey: ['issue', this.issue],
      queryFn: () => getIssueByNumber(this.issue),
      enabled: this.issue !== '',
      staleTime: 1000 * 60 * 3,
    }));
  }

  getIssueCommentsQuery(): CreateQueryResult<GitHubIssue[], Error> {
    return injectQuery(() => ({
      queryKey: ['issue', this.issue, 'comments'],
      queryFn: () => getIssueCommentsByNumber(this.issue),
      enabled: this.issue !== '',
    }));
  }

  prefetchIssue(issueId: string): void {
    this.queryClient.prefetchQuery({
      queryKey: ['issue', issueId],
      queryFn: () => getIssueByNumber(issueId),
      staleTime: 1000 * 60 * 3,
    });
  }

  setIssueData(issue: GitHubIssue): void {
    this.queryClient.setQueryData(['issue', issue.number.toString()], issue, {
      updatedAt: 1000 * 60,
    });
  }
}
