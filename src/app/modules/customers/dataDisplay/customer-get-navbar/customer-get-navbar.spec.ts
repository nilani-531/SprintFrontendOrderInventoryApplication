import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerGetNavbar } from './customer-get-navbar';

describe('CustomerGetNavbar', () => {
  let component: CustomerGetNavbar;
  let fixture: ComponentFixture<CustomerGetNavbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerGetNavbar],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerGetNavbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
