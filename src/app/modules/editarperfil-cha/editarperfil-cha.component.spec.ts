import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarperfilChaComponent } from './editarperfil-cha.component';

describe('EditarperfilChaComponent', () => {
  let component: EditarperfilChaComponent;
  let fixture: ComponentFixture<EditarperfilChaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarperfilChaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarperfilChaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
