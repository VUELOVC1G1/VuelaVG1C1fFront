import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarpromocionComponent } from './editarpromocion.component';

describe('EditarpromocionComponent', () => {
  let component: EditarpromocionComponent;
  let fixture: ComponentFixture<EditarpromocionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarpromocionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarpromocionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
