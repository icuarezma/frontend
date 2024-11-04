import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmdeletetaskComponent } from './confirmdeletetask.component';

describe('ConfirmdeletetaskComponent', () => {
  let component: ConfirmdeletetaskComponent;
  let fixture: ComponentFixture<ConfirmdeletetaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmdeletetaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmdeletetaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
