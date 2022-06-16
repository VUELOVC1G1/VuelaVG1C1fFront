import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VuelohomeComponent } from './vuelohome.component';

describe('VuelohomeComponent', () => {
  let component: VuelohomeComponent;
  let fixture: ComponentFixture<VuelohomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VuelohomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VuelohomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
