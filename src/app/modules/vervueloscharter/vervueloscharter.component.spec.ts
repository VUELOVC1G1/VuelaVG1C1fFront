import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VervueloscharterComponent } from './vervueloscharter.component';

describe('VervueloscharterComponent', () => {
  let component: VervueloscharterComponent;
  let fixture: ComponentFixture<VervueloscharterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VervueloscharterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VervueloscharterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
