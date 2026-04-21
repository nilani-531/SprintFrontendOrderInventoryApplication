import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersDataPost } from './orders-data-post';

describe('OrdersDataPost', () => {
  let component: OrdersDataPost;
  let fixture: ComponentFixture<OrdersDataPost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersDataPost],
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersDataPost);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
