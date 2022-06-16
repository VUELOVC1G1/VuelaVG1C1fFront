import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevapromocionComponent } from './nuevapromocion.component';

describe('NuevapromocionComponent', () => {
  let component: NuevapromocionComponent;
  let fixture: ComponentFixture<NuevapromocionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevapromocionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevapromocionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
