import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersApiDisplay } from './customers-api-display';

describe('CustomersApiDisplay', () => {
  let component: CustomersApiDisplay;
  let fixture: ComponentFixture<CustomersApiDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomersApiDisplay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomersApiDisplay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
