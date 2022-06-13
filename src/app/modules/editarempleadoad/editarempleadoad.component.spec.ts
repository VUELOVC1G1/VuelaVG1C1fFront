import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarempleadoadComponent } from './editarempleadoad.component';

describe('EditarempleadoadComponent', () => {
  let component: EditarempleadoadComponent;
  let fixture: ComponentFixture<EditarempleadoadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarempleadoadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarempleadoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
