import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { QueryClient } from '@tanstack/angular-query-experimental';

import IssuePageComponent from './issue-page.component';

describe('IssuePageComponent', () => {
  let component: IssuePageComponent;
  let fixture: ComponentFixture<IssuePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssuePageComponent],
      providers: [provideRouter([]), QueryClient],
    }).compileComponents();

    fixture = TestBed.createComponent(IssuePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
