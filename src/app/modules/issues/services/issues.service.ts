import { Injectable, signal, WritableSignal } from '@angular/core';

import {
  CreateQueryResult,
  injectQuery,
} from '@tanstack/angular-query-experimental';

import { getIssues } from '../actions';

import { GitHubIssue, State } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class IssuesService {
  private readonly _selectedState: WritableSignal<State> = signal<State>(
    State.All,
  );

  issuesQuery: CreateQueryResult<GitHubIssue[], Error> = injectQuery(() => ({
    queryKey: ['issues', this.selectedState],
    queryFn: () => getIssues(this.selectedState),
  }));

  get selectedState(): State {
    return this._selectedState();
  }

  set selectedState(state: State) {
    this._selectedState.set(state);
  }
}
