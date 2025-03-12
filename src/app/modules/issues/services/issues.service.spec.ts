import { TestBed } from '@angular/core/testing';

import {
  provideTanStackQuery,
  QueryClient,
} from '@tanstack/angular-query-experimental';
import { State } from '../interfaces';

import { IssuesService } from './issues.service';
import { LabelsService } from './labels.service';

describe('IssuesService', () => {
  let service: IssuesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideTanStackQuery(new QueryClient())],
    });
    service = TestBed.inject(IssuesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set selected state: CLOSED', async () => {
    service.selectedState = State.Closed;
    expect(service.selectedState).toBe(State.Closed);

    const { data: d1 } = await service.issuesQuery.refetch();

    d1?.forEach((issue) => {
      expect(issue.state).toBe(State.Closed);
    });
  });

  it('should set selected state: OPEN', async () => {
    service.selectedState = State.Open;
    expect(service.selectedState).toBe(State.Open);
    const { data: d2 } = await service.issuesQuery.refetch();

    d2?.forEach((issue) => {
      expect(issue.state).toBe(State.Open);
    });
  });

  it('should get issues by label', async () => {
    const labelsService = TestBed.inject(LabelsService);

    labelsService.toggleLabel = 'Accessibility';
    expect(labelsService.selectedLabels.has('Accessibility')).toBeTrue();

    const { data } = await service.issuesQuery.refetch();

    data?.forEach((issue) => {
      const hasLabel: boolean = issue.labels.some(
        (label) => label.name === 'Accessibility',
      );
      expect(hasLabel).toBeTrue();
    });
  });
});
