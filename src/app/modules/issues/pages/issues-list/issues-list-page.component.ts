import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { IssuesLabelsSelectorComponent } from '../../components/issues-labels-selector/issues-labels-selector.component';

import { LabelsService } from '../../services/labels.service';

@Component({
  selector: 'issues-list-page',
  imports: [RouterLink, IssuesLabelsSelectorComponent],
  templateUrl: './issues-list-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class IssuesListPageComponent {
  private readonly labelsService: LabelsService = inject(LabelsService);

  get labels() {
    return this.labelsService.labelsQuery;
  }
}
