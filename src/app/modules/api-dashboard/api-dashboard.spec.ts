import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiDashboard } from './api-dashboard';

describe('ApiDashboard', () => {
  let component: ApiDashboard;
  let fixture: ComponentFixture<ApiDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(ApiDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
