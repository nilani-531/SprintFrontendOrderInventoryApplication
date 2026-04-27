import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersApiDispaly } from './orders-api-dispaly';

describe('OrdersApiDispaly', () => {
  let component: OrdersApiDispaly;
  let fixture: ComponentFixture<OrdersApiDispaly>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersApiDispaly],
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersApiDispaly);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
  goBack() { this.router.navigate(['/api-dashboard']); }
