import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersAndOrderItemDataGet } from './orders-and-order-item-data-get';

describe('OrdersAndOrderItemDataGet', () => {
  let component: OrdersAndOrderItemDataGet;
  let fixture: ComponentFixture<OrdersAndOrderItemDataGet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersAndOrderItemDataGet],
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersAndOrderItemDataGet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
