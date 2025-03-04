import { Injectable, signal, WritableSignal } from '@angular/core';

import {
  CreateQueryResult,
  injectQuery,
} from '@tanstack/angular-query-experimental';

import { getLabels } from '../actions';

import { GitHubLabel } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class LabelsService {
  private readonly _selectedLabels: WritableSignal<Set<string>> = signal(
    new Set<string>(),
  );

  labelsQuery: CreateQueryResult<GitHubLabel[], Error> = injectQuery(() => ({
    queryKey: ['labels'],
    queryFn: () => getLabels(),
  }));

  get selectedLabels(): Set<string> {
    return this._selectedLabels();
  }

  set selectedLabels(labels: Set<string>) {
    this._selectedLabels.set(labels);
  }

  set toggleLabel(label: string) {
    const labels: Set<string> = this.selectedLabels;

    if (labels.has(label)) {
      labels.delete(label);
    } else {
      labels.add(label);
    }

    this.selectedLabels = new Set(labels);
  }
}
