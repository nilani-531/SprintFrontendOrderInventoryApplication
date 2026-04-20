import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoresDataPost } from './stores-data-post';

describe('StoresDataPost', () => {
  let component: StoresDataPost;
  let fixture: ComponentFixture<StoresDataPost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoresDataPost],
    }).compileComponents();

    fixture = TestBed.createComponent(StoresDataPost);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
