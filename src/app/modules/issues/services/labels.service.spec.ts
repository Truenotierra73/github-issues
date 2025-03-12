import { TestBed } from '@angular/core/testing';

import {
  provideTanStackQuery,
  QueryClient,
} from '@tanstack/angular-query-experimental';

import { LabelsService } from './labels.service';

import labelsMock from '@mocks/github-label.mock.json';

describe('LabelsService', () => {
  let service: LabelsService;
  let labels: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideTanStackQuery(new QueryClient())],
    });
    service = TestBed.inject(LabelsService);
    labels = jasmine
      .createSpy('service.labelsQuery.data', service.labelsQuery.data)
      .and.returnValue(labelsMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load labels', () => {
    expect(labels()?.length).toBe(30);

    const [label] = labels()!;

    expect(typeof label.name).toBe('string');
    expect(typeof label.color).toBe('string');
    expect(typeof label.id).toBe('number');
    expect(typeof label.url).toBe('string');
    expect(typeof label.default).toBe('boolean');
    expect(typeof label.description).toBe('string');
    expect(typeof label.node_id).toBe('string');
  });

  it('should set toggle label', () => {
    const LABELS: string[] = [
      labels()![0].name,
      labels()![1].name,
      labels()![2].name,
    ];
    expect(service.selectedLabels.size).toBe(0);

    service.toggleLabel = LABELS[0];
    service.toggleLabel = LABELS[2];
    expect(service.selectedLabels.size).toBe(2);
    service.selectedLabels.forEach((label) => {
      expect(LABELS).toContain(label);
    });

    service.toggleLabel = LABELS[0];
    expect(service.selectedLabels.size).toBe(1);

    service.toggleLabel = LABELS[2];
    expect(service.selectedLabels.size).toBe(0);

    service.toggleLabel = LABELS[0];
    expect(service.selectedLabels.has(LABELS[0]))
      .withContext('Accessibility')
      .toBeTrue();

    service.toggleLabel = LABELS[0];
    expect(service.selectedLabels.has(LABELS[0]))
      .withContext('Accessibility')
      .toBeFalse();
  });
});
