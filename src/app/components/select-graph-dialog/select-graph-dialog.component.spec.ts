import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectGraphDialogComponent } from './select-graph-dialog.component';

describe('SelectGraphDialogComponent', () => {
  let component: SelectGraphDialogComponent;
  let fixture: ComponentFixture<SelectGraphDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectGraphDialogComponent]
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
