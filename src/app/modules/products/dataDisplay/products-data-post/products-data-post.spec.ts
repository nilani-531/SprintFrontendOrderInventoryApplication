import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsDataPost } from './products-data-post';

describe('ProductsDataPost', () => {
  let component: ProductsDataPost;
  let fixture: ComponentFixture<ProductsDataPost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsDataPost],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsDataPost);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
