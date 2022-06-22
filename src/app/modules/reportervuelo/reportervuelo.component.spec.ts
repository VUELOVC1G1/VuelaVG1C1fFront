import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportervueloComponent } from './reportervuelo.component';

describe('ReportervueloComponent', () => {
  let component: ReportervueloComponent;
  let fixture: ComponentFixture<ReportervueloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportervueloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportervueloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
