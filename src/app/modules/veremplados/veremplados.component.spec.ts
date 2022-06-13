import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerempladosComponent } from './veremplados.component';

describe('VerempladosComponent', () => {
  let component: VerempladosComponent;
  let fixture: ComponentFixture<VerempladosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerempladosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerempladosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
