import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevarutaComponent } from './nuevaruta.component';

describe('NuevarutaComponent', () => {
  let component: NuevarutaComponent;
  let fixture: ComponentFixture<NuevarutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevarutaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevarutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
