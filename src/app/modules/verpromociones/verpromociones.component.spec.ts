import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerpromocionesComponent } from './verpromociones.component';

describe('VerpromocionesComponent', () => {
  let component: VerpromocionesComponent;
  let fixture: ComponentFixture<VerpromocionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerpromocionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerpromocionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
