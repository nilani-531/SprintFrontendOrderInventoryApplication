import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersDataPut } from './orders-data-put';

describe('OrdersDataPut', () => {
  let component: OrdersDataPut;
  let fixture: ComponentFixture<OrdersDataPut>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersDataPut],
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersDataPut);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
