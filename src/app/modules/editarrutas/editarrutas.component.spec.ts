import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarrutasComponent } from './editarrutas.component';

describe('EditarrutasComponent', () => {
  let component: EditarrutasComponent;
  let fixture: ComponentFixture<EditarrutasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarrutasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarrutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
