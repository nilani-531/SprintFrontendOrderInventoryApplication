import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersDataPost } from './customers-data-post';

describe('CustomersDataPost', () => {
  let component: CustomersDataPost;
  let fixture: ComponentFixture<CustomersDataPost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomersDataPost],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomersDataPost);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
