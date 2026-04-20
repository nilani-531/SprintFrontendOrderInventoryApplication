import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersDataDelete } from './customers-data-delete';

describe('CustomersDataDelete', () => {
  let component: CustomersDataDelete;
  let fixture: ComponentFixture<CustomersDataDelete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomersDataDelete],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomersDataDelete);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
