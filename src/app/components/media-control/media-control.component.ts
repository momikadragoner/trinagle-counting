import { Component, input, model } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'media-control',
  imports: [MatIconModule, MatButtonModule, MatSliderModule],
  templateUrl: './media-control.component.html',
  styleUrl: './media-control.component.scss'
})
export class MediaControlComponent {
  disabled = false;
  showTicks = false;
  thumbLabel = false;
  playing = model(false);
  title = input<string>('Unknown Algorithm');
  value = model(0, { alias: 'currentStep' });
  max = input(20);
  min = 0;
  step = 1;

  nextStep() {
    this.value.update(oldValue => {
      if (oldValue < this.max()) return oldValue += this.step;
      return oldValue;
    })
  }

  previousStep() {
    this.value.update(oldValue => {
      if (oldValue > this.min) return oldValue -= this.step;
      return oldValue;
    })
  }

  togglePlayPause() {
    this.playing.update(oldValue => !oldValue);
    this.playLoop();
  }

  async playLoop() {
    while (this.playing()) {
      if (this.value() < this.max()) {
        this.value.update(x => x + 1);
        await this.wait(500);
      } else {
        this.playing.set(false);
      }
    }
  }

  async wait(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
