import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoresDataPut } from './stores-data-put';

describe('StoresDataPut', () => {
  let component: StoresDataPut;
  let fixture: ComponentFixture<StoresDataPut>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoresDataPut],
    }).compileComponents();

    fixture = TestBed.createComponent(StoresDataPut);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
