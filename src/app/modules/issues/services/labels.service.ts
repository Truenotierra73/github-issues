import { Injectable } from '@angular/core';

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
  labelsQuery: CreateQueryResult<GitHubLabel[], Error> = injectQuery(() => ({
    queryKey: ['labels'],
    queryFn: () => getLabels(),
  }));
}
