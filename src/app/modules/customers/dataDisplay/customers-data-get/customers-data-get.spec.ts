import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersDataGet } from './customers-data-get';

describe('CustomersDataGet', () => {
  let component: CustomersDataGet;
  let fixture: ComponentFixture<CustomersDataGet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomersDataGet],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomersDataGet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
