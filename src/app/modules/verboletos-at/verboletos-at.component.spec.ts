import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerboletosAtComponent } from './verboletos-at.component';

describe('VerboletosAtComponent', () => {
  let component: VerboletosAtComponent;
  let fixture: ComponentFixture<VerboletosAtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerboletosAtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerboletosAtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
