import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaplayFileComponent } from './diaplay-file.component';

describe('DiaplayFileComponent', () => {
  let component: DiaplayFileComponent;
  let fixture: ComponentFixture<DiaplayFileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiaplayFileComponent]
    });
    fixture = TestBed.createComponent(DiaplayFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
