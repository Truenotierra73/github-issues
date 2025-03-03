import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
} from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';
import { GitHubIssue } from '../../interfaces';

@Component({
  selector: 'issue-comment',
  imports: [MarkdownComponent],
  templateUrl: './issue-comment.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssueCommentComponent {
  issue: InputSignal<GitHubIssue> = input.required<GitHubIssue>();
}
