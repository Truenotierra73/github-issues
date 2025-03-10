import { TestBed, waitForAsync } from '@angular/core/testing';

import {
  provideTanStackQuery,
  QueryClient,
} from '@tanstack/angular-query-experimental';

import { LabelsService } from './labels.service';

import labelsMock from '@mocks/github-label.mock.json';

describe('LabelsService', () => {
  let service: LabelsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideTanStackQuery(new QueryClient())],
    });
    service = TestBed.inject(LabelsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load labels', () => {
    const labels = jasmine
      .createSpy('_', service.labelsQuery.data)
      .and.returnValue(labelsMock);

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
});
