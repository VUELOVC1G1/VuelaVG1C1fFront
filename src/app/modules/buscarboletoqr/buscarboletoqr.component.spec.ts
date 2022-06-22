import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarboletoqrComponent } from './buscarboletoqr.component';

describe('BuscarboletoqrComponent', () => {
  let component: BuscarboletoqrComponent;
  let fixture: ComponentFixture<BuscarboletoqrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarboletoqrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarboletoqrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
