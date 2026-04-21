import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemsDataDelete } from './order-items-data-delete';

describe('OrderItemsDataDelete', () => {
  let component: OrderItemsDataDelete;
  let fixture: ComponentFixture<OrderItemsDataDelete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderItemsDataDelete],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderItemsDataDelete);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
