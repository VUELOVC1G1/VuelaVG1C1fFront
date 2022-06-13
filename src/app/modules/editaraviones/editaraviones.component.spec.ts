import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaravionesComponent } from './editaraviones.component';

describe('EditaravionesComponent', () => {
  let component: EditaravionesComponent;
  let fixture: ComponentFixture<EditaravionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditaravionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditaravionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
