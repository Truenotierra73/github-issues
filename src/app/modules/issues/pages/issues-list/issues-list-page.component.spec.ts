import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryClient } from '@tanstack/angular-query-experimental';

import IssuesListPageComponent from './issues-list-page.component';

describe('IssuesListPageComponent', () => {
  let component: IssuesListPageComponent;
  let fixture: ComponentFixture<IssuesListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssuesListPageComponent],
      providers: [QueryClient],
    }).compileComponents();

    fixture = TestBed.createComponent(IssuesListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
