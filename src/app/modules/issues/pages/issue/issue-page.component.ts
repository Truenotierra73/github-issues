import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';

import { CreateQueryResult } from '@tanstack/angular-query-experimental';

import { map, tap } from 'rxjs';

import { IssueCommentComponent } from '../../components/issue-comment/issue-comment.component';

import { GitHubIssue } from '../../interfaces';

import { IssueService } from '../../services/issue.service';

@Component({
  selector: 'issue-page',
  imports: [RouterLink, IssueCommentComponent],
  templateUrl: './issue-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class IssuePageComponent {
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly issueService: IssueService = inject(IssueService);

  issueNumber: Signal<string | undefined> = toSignal<string>(
    this.route.paramMap.pipe(
      map((params: ParamMap) => params.get('number') ?? ''),
      tap((issue: string) => (this.issueService.issue = issue)),
    ),
  );
  issueQuery: CreateQueryResult<GitHubIssue, Error> =
    this.issueService.getIssueQuery();
}
