import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersDataPut } from './customers-data-put';

describe('CustomersDataPut', () => {
  let component: CustomersDataPut;
  let fixture: ComponentFixture<CustomersDataPut>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomersDataPut],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomersDataPut);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
