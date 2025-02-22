import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaControlComponent } from './media-control.component';

describe('MediaControlComponent', () => {
  let component: MediaControlComponent;
  let fixture: ComponentFixture<MediaControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
