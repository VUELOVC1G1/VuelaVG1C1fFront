import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoempleadoComponent } from './nuevoempleado.component';

describe('NuevoempleadoComponent', () => {
  let component: NuevoempleadoComponent;
  let fixture: ComponentFixture<NuevoempleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoempleadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoempleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
