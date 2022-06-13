import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerrutasComponent } from './verrutas.component';

describe('VerrutasComponent', () => {
  let component: VerrutasComponent;
  let fixture: ComponentFixture<VerrutasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerrutasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerrutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
