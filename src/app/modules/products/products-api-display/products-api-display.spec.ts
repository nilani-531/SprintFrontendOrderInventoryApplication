import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsApiDisplay } from './products-api-display';

describe('ProductsApiDisplay', () => {
  let component: ProductsApiDisplay;
  let fixture: ComponentFixture<ProductsApiDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsApiDisplay],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsApiDisplay);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
  goBack() { this.router.navigate(['/api-dashboard']); }
