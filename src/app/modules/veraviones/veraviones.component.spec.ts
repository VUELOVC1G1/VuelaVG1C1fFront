import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeravionesComponent } from './veraviones.component';

describe('VeravionesComponent', () => {
  let component: VeravionesComponent;
  let fixture: ComponentFixture<VeravionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VeravionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VeravionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
