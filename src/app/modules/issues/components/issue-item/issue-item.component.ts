import { NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  InputSignal,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { GitHubIssue, State } from '../../interfaces';

import { IssueService } from '../../services/issue.service';

@Component({
  selector: 'issue-item',
  imports: [RouterLink, NgStyle],
  templateUrl: './issue-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssueItemComponent {
  issue: InputSignal<GitHubIssue> = input.required<GitHubIssue>();

  private readonly issueService: IssueService = inject(IssueService);

  // isOpen = computed(() => this.issue().state === State.Open);
  get isOpen(): boolean {
    return this.issue().state === State.Open;
  }

  /**
   * Realiza una petición para obtener los datos más rápido antes de ejecutar el query.
   */
  prefetchIssue(): void {
    this.issueService.prefetchIssue(this.issue().number.toString());
  }

  /**
   * Inicializa el caché con datos existentes (los datos los tenés de antemoano). Funciona similar al prefetch, solo
   * que se ahorra una petición http.
   */
  setIssueData(): void {
    this.issueService.setIssueData(this.issue());
  }
}
