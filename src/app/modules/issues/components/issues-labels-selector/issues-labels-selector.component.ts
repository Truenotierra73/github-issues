import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  InputSignal,
} from '@angular/core';

import { GitHubLabel } from '../../interfaces';

import { LabelsService } from '../../services/labels.service';

@Component({
  selector: 'issues-labels-selector',
  imports: [],
  templateUrl: './issues-labels-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssuesLabelsSelectorComponent {
  labels: InputSignal<GitHubLabel[]> = input.required<GitHubLabel[]>();

  private readonly labelsService: LabelsService = inject(LabelsService);

  isSelectedLabel(label: string): boolean {
    return this.labelsService.selectedLabels.has(label);
  }

  onToggleLabel(label: string): void {
    this.labelsService.toggleLabel = label;
  }
}
