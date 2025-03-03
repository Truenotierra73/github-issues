import { NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { GitHubIssue, State } from '../../interfaces';

@Component({
  selector: 'issue-item',
  imports: [RouterLink, NgStyle],
  templateUrl: './issue-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssueItemComponent {
  issue: InputSignal<GitHubIssue> = input.required<GitHubIssue>();
  // isOpen = computed(() => this.issue().state === State.Open);

  get isOpen(): boolean {
    return this.issue().state === State.Open;
  }
}
