import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerhoariosComponent } from './verhoarios.component';

describe('VerhoariosComponent', () => {
  let component: VerhoariosComponent;
  let fixture: ComponentFixture<VerhoariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerhoariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerhoariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
