import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevocharterComponent } from './nuevocharter.component';

describe('NuevocharterComponent', () => {
  let component: NuevocharterComponent;
  let fixture: ComponentFixture<NuevocharterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevocharterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevocharterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
