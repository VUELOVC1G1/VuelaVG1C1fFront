import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersolitudAoComponent } from './versolitud-ao.component';

describe('VersolitudAoComponent', () => {
  let component: VersolitudAoComponent;
  let fixture: ComponentFixture<VersolitudAoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VersolitudAoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VersolitudAoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
