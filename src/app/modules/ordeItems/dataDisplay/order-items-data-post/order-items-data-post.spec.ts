import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemsDataPost } from './order-items-data-post';

describe('OrderItemsDataPost', () => {
  let component: OrderItemsDataPost;
  let fixture: ComponentFixture<OrderItemsDataPost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderItemsDataPost],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderItemsDataPost);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
