import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
} from '@angular/core';

import { GitHubLabel } from '../../interfaces';

@Component({
  selector: 'issues-labels-selector',
  imports: [],
  templateUrl: './issues-labels-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssuesLabelsSelectorComponent {
  labels: InputSignal<GitHubLabel[]> = input.required<GitHubLabel[]>();
}
