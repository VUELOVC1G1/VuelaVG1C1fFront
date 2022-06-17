import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VuevotiketComponent } from './vuevotiket.component';

describe('VuevotiketComponent', () => {
  let component: VuevotiketComponent;
  let fixture: ComponentFixture<VuevotiketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VuevotiketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VuevotiketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
