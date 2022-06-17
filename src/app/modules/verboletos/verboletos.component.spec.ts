import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerboletosComponent } from './verboletos.component';

describe('VerboletosComponent', () => {
  let component: VerboletosComponent;
  let fixture: ComponentFixture<VerboletosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerboletosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerboletosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
