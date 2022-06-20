import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarperfilEmComponent } from './editarperfil-em.component';

describe('EditarperfilEmComponent', () => {
  let component: EditarperfilEmComponent;
  let fixture: ComponentFixture<EditarperfilEmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarperfilEmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarperfilEmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
