import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphDialogComponent } from './graph-dialog.component';

describe('GraphDialogComponent', () => {
  let component: GraphDialogComponent;
  let fixture: ComponentFixture<GraphDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
