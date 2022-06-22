import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportefacturasComponent } from './reportefacturas.component';

describe('ReportefacturasComponent', () => {
  let component: ReportefacturasComponent;
  let fixture: ComponentFixture<ReportefacturasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportefacturasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportefacturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
