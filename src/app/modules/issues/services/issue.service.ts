import { Injectable, signal, WritableSignal } from '@angular/core';

import {
  injectQuery,
  CreateQueryResult,
} from '@tanstack/angular-query-experimental';

import { getIssueByNumber, getIssueCommentsByNumber } from '../actions';

import { GitHubIssue } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
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
    }));
  }

  getIssueCommentsQuery(): CreateQueryResult<GitHubIssue[], Error> {
    return injectQuery(() => ({
      queryKey: ['issue', this.issue, 'comments'],
      queryFn: () => getIssueCommentsByNumber(this.issue),
      enabled: this.issue !== '',
    }));
  }
}
