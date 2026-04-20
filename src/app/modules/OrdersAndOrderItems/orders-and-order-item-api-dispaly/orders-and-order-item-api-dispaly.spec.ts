import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersAndOrderItemApiDispaly } from './orders-and-order-item-api-dispaly';

describe('OrdersAndOrderItemApiDispaly', () => {
  let component: OrdersAndOrderItemApiDispaly;
  let fixture: ComponentFixture<OrdersAndOrderItemApiDispaly>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersAndOrderItemApiDispaly],
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersAndOrderItemApiDispaly);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
