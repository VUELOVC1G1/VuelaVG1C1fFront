import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasajescharterComponent } from './pasajescharter.component';

describe('PasajescharterComponent', () => {
  let component: PasajescharterComponent;
  let fixture: ComponentFixture<PasajescharterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasajescharterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasajescharterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
