import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgorithmDialogComponent } from './algorithm-dialog.component';

describe('AlgorithmDialogComponent', () => {
  let component: AlgorithmDialogComponent;
  let fixture: ComponentFixture<AlgorithmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlgorithmDialogComponent]
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
