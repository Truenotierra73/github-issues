import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
} from '@angular/core';

import { CreateQueryResult } from '@tanstack/angular-query-experimental';

import { IssuesLabelsSelectorComponent } from '../../components/issues-labels-selector/issues-labels-selector.component';
import { IssueItemComponent } from '../../components/issue-item/issue-item.component';

import { GitHubIssue, GitHubLabel, State } from '../../interfaces';

import { LabelsService } from '../../services/labels.service';
import { IssuesService } from '../../services/issues.service';

@Component({
  selector: 'issues-list-page',
  imports: [IssuesLabelsSelectorComponent, IssueItemComponent],
  templateUrl: './issues-list-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class IssuesListPageComponent {
  private readonly labelsService: LabelsService = inject(LabelsService);
  private readonly issuesService: IssuesService = inject(IssuesService);
  protected readonly State = State;

  currentState: Signal<State> = computed(
    () => this.issuesService.selectedState,
  );

  get labels(): CreateQueryResult<GitHubLabel[], Error> {
    return this.labelsService.labelsQuery;
  }

  get issues(): CreateQueryResult<GitHubIssue[], Error> {
    return this.issuesService.issuesQuery;
  }

  onChangeState(state: State): void {
    this.issuesService.selectedState = state;
  }
}
