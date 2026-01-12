import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Synopsis } from './synopsis';

describe('Synopsis', () => {
  let component: Synopsis;
  let fixture: ComponentFixture<Synopsis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Synopsis]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Synopsis);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
