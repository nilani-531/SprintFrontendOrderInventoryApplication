import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemsDataPut } from './order-items-data-put';

describe('OrderItemsDataPut', () => {
  let component: OrderItemsDataPut;
  let fixture: ComponentFixture<OrderItemsDataPut>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderItemsDataPut],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderItemsDataPut);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
