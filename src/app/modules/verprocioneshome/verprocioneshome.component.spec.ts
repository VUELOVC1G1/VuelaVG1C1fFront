import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerprocioneshomeComponent } from './verprocioneshome.component';

describe('VerprocioneshomeComponent', () => {
  let component: VerprocioneshomeComponent;
  let fixture: ComponentFixture<VerprocioneshomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerprocioneshomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerprocioneshomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
