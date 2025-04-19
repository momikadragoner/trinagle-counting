import { Component, inject, input } from '@angular/core';
import { Demo } from '../../model/demo.model';
import { ObjectConverterService } from '../../services/object-converter.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'variable-view',
  imports: [JsonPipe],
  templateUrl: './variable-view.component.html',
  styleUrl: './variable-view.component.scss'
})
export class VariableViewComponent {

  private objConverter = inject(ObjectConverterService);

  demo = input<Demo>();
  currentStep = input<number>(0);

  get variables() {
    return this.objConverter.objectToArray(this.demo()?.snapshotSequence[this.currentStep()].variables);
  }
}
