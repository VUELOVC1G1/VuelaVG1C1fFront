import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VervuelosComponent } from './vervuelos.component';

describe('VervuelosComponent', () => {
  let component: VervuelosComponent;
  let fixture: ComponentFixture<VervuelosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VervuelosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VervuelosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
