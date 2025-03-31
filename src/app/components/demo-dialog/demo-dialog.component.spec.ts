import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoDialogComponent } from './demo-dialog.component';

describe('DemoDialogComponent', () => {
  let component: DemoDialogComponent;
  let fixture: ComponentFixture<DemoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemoDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
