import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateFileComponent } from './validate-file.component';

describe('ValidateFileComponent', () => {
  let component: ValidateFileComponent;
  let fixture: ComponentFixture<ValidateFileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValidateFileComponent]
    });
    fixture = TestBed.createComponent(ValidateFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
