import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoDialogComponent } from './demo-dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

describe('DemoDialogComponent', () => {
  let component: DemoDialogComponent;
  let fixture: ComponentFixture<DemoDialogComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close'),
  };
  const mockDialogData = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DemoDialogComponent,
        MatDialogModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
      ]
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
