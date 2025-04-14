import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectGraphDialogComponent } from './select-graph-dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

describe('SelectGraphDialogComponent', () => {
  let component: SelectGraphDialogComponent;
  let fixture: ComponentFixture<SelectGraphDialogComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close'),
  };
  const mockDialogData = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SelectGraphDialogComponent,
        MatDialogModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SelectGraphDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
