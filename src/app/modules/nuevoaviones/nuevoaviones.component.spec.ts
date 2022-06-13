import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoavionesComponent } from './nuevoaviones.component';

describe('NuevoavionesComponent', () => {
  let component: NuevoavionesComponent;
  let fixture: ComponentFixture<NuevoavionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoavionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoavionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
