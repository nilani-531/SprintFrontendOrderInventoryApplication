import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersDataGet } from './orders-data-get';

describe('OrdersDataGet', () => {
  let component: OrdersDataGet;
  let fixture: ComponentFixture<OrdersDataGet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersDataGet],
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersDataGet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
