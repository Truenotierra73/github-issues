import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { QueryClient } from '@tanstack/angular-query-experimental';

import { IssueItemComponent } from './issue-item.component';

import gitHubIssues from '@mocks/github-issues.mock.json';

describe('IssueItemComponent', () => {
  let component: IssueItemComponent;
  let fixture: ComponentFixture<IssueItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssueItemComponent],
      providers: [provideRouter([]), QueryClient],
    }).compileComponents();

    fixture = TestBed.createComponent(IssueItemComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('issue', gitHubIssues[0]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
