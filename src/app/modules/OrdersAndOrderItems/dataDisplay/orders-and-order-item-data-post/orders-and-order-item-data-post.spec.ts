import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersAndOrderItemDataPost } from './orders-and-order-item-data-post';

describe('OrdersAndOrderItemDataPost', () => {
  let component: OrdersAndOrderItemDataPost;
  let fixture: ComponentFixture<OrdersAndOrderItemDataPost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersAndOrderItemDataPost],
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersAndOrderItemDataPost);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
