import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipajeInfoComponent } from './equipaje-info.component';

describe('EquipajeInfoComponent', () => {
  let component: EquipajeInfoComponent;
  let fixture: ComponentFixture<EquipajeInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipajeInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipajeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
