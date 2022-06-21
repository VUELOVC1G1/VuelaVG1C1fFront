import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VermanifiestoChaComponent } from './vermanifiesto-cha.component';

describe('VermanifiestoChaComponent', () => {
  let component: VermanifiestoChaComponent;
  let fixture: ComponentFixture<VermanifiestoChaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VermanifiestoChaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VermanifiestoChaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
