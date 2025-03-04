import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryClient } from '@tanstack/angular-query-experimental';

import { LabelsService } from '../../services/labels.service';

import { IssuesLabelsSelectorComponent } from './issues-labels-selector.component';

import gitHubLabels from '@mocks/github-label.mock.json';

describe('IssuesLabelsSelectorComponent', () => {
  let component: IssuesLabelsSelectorComponent;
  let fixture: ComponentFixture<IssuesLabelsSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssuesLabelsSelectorComponent],
      providers: [LabelsService, QueryClient],
    }).compileComponents();

    fixture = TestBed.createComponent(IssuesLabelsSelectorComponent);
    component = fixture.componentInstance;
    console.log(gitHubLabels);
    fixture.componentRef.setInput('labels', gitHubLabels);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
