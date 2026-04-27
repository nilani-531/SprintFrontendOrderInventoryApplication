import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemsApiDisplay } from './order-items-api-display';

describe('OrderItemsApiDisplay', () => {
  let component: OrderItemsApiDisplay;
  let fixture: ComponentFixture<OrderItemsApiDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderItemsApiDisplay],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderItemsApiDisplay);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
