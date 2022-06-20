import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarperfilPaComponent } from './editarperfil-pa.component';

describe('EditarperfilPaComponent', () => {
  let component: EditarperfilPaComponent;
  let fixture: ComponentFixture<EditarperfilPaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarperfilPaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarperfilPaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
