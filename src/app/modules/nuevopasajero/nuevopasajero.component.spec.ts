import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevopasajeroComponent } from './nuevopasajero.component';

describe('NuevopasajeroComponent', () => {
  let component: NuevopasajeroComponent;
  let fixture: ComponentFixture<NuevopasajeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevopasajeroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevopasajeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
