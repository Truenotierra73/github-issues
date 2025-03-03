import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { IssuesLabelsSelectorComponent } from '../../components/issues-labels-selector/issues-labels-selector.component';
import { IssueItemComponent } from '../../components/issue-item/issue-item.component';

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

  get labels() {
    return this.labelsService.labelsQuery;
  }

  get issues() {
    return this.issuesService.issuesQuery;
  }
}
