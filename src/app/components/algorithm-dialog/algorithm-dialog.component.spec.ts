import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgorithmDialogComponent } from './algorithm-dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

describe('AlgorithmDialogComponent', () => {
  let component: AlgorithmDialogComponent;
  let fixture: ComponentFixture<AlgorithmDialogComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close'),
  };
  const mockDialogData = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AlgorithmDialogComponent,
        MatDialogModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlgorithmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
