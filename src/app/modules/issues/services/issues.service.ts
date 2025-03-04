import { inject, Injectable, signal, WritableSignal } from '@angular/core';

import {
  CreateQueryResult,
  injectQuery,
} from '@tanstack/angular-query-experimental';

import { getIssues } from '../actions';

import { GitHubIssue, State } from '../interfaces';

import { LabelsService } from './labels.service';

@Injectable({
  providedIn: 'root',
})
export class IssuesService {
  private readonly _selectedState: WritableSignal<State> = signal<State>(
    State.All,
  );
  private readonly labelsService: LabelsService = inject(LabelsService);

  issuesQuery: CreateQueryResult<GitHubIssue[], Error> = injectQuery(() => ({
    queryKey: [
      'issues',
      {
        state: this.selectedState,
        selectedLabels: [...this.labelsService.selectedLabels],
      },
    ],
    queryFn: () =>
      getIssues(this.selectedState, [...this.labelsService.selectedLabels]),
    staleTime: 1000 * 60,
  }));

  get selectedState(): State {
    return this._selectedState();
  }

  set selectedState(state: State) {
    this._selectedState.set(state);
  }
}
