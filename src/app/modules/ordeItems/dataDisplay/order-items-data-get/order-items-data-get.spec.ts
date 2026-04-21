import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemsDataGet } from './order-items-data-get';

describe('OrderItemsDataGet', () => {
  let component: OrderItemsDataGet;
  let fixture: ComponentFixture<OrderItemsDataGet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderItemsDataGet],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderItemsDataGet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
