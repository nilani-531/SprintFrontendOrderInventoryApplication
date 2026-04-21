import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersDataDelete } from './orders-data-delete';

describe('OrdersDataDelete', () => {
  let component: OrdersDataDelete;
  let fixture: ComponentFixture<OrdersDataDelete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersDataDelete],
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersDataDelete);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
