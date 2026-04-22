import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoresDataDelete } from './stores-data-delete';

describe('StoresDataDelete', () => {
  let component: StoresDataDelete;
  let fixture: ComponentFixture<StoresDataDelete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoresDataDelete],
    }).compileComponents();

    fixture = TestBed.createComponent(StoresDataDelete);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
