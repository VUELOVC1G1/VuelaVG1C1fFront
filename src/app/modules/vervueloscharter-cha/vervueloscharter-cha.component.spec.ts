import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VervueloscharterChaComponent } from './vervueloscharter-cha.component';

describe('VervueloscharterChaComponent', () => {
  let component: VervueloscharterChaComponent;
  let fixture: ComponentFixture<VervueloscharterChaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VervueloscharterChaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VervueloscharterChaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
