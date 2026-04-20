import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersAndOrderItemDataDelete } from './orders-and-order-item-data-delete';

describe('OrdersAndOrderItemDataDelete', () => {
  let component: OrdersAndOrderItemDataDelete;
  let fixture: ComponentFixture<OrdersAndOrderItemDataDelete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersAndOrderItemDataDelete],
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersAndOrderItemDataDelete);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
