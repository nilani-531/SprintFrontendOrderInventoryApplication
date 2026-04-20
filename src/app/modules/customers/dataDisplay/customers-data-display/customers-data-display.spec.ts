import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersDataDisplay } from './customers-data-display';

describe('CustomersDataDisplay', () => {
  let component: CustomersDataDisplay;
  let fixture: ComponentFixture<CustomersDataDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomersDataDisplay],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomersDataDisplay);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
