import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VermanifiestoJaComponent } from './vermanifiesto-ja.component';

describe('VermanifiestoJaComponent', () => {
  let component: VermanifiestoJaComponent;
  let fixture: ComponentFixture<VermanifiestoJaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VermanifiestoJaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VermanifiestoJaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
