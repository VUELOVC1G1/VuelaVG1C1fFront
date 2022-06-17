import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersolicitudChaComponent } from './versolicitud-cha.component';

describe('VersolicitudChaComponent', () => {
  let component: VersolicitudChaComponent;
  let fixture: ComponentFixture<VersolicitudChaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VersolicitudChaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VersolicitudChaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
