import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarhorarioComponent } from './editarhorario.component';

describe('EditarhorarioComponent', () => {
  let component: EditarhorarioComponent;
  let fixture: ComponentFixture<EditarhorarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarhorarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarhorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
