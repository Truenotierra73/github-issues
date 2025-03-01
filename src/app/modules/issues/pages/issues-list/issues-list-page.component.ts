import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { LabelsService } from '../../services/labels.service';

@Component({
  selector: 'issues-list-page',
  imports: [RouterLink, JsonPipe],
  templateUrl: './issues-list-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class IssuesListPageComponent {
  private readonly labelsService: LabelsService = inject(LabelsService);

  get labels() {
    return this.labelsService.labelsQuery$;
  }
}
