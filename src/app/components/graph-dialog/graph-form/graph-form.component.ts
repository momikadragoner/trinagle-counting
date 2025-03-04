import { Component, inject, model, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'graph-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule],
  templateUrl: './graph-form.component.html',
  styleUrl: './graph-form.component.scss'
})
export class GraphFormComponent {
  private formBuilder = inject(FormBuilder);
  formComplete = output<[string, number]>()

  graphForm = this.formBuilder.group({
    name: this.formBuilder.control('My Graph', Validators.required),
    numOfNodes: this.formBuilder.control('', [Validators.required, Validators.min(3), Validators.max(20)])
  });

  onSubmit() {
    if (!this.graphForm.valid) {
      //error
    } else {
      this.formComplete.emit([
        this.graphForm.value.name ?? '',
        Number(this.graphForm.value.numOfNodes)
      ])
    }
  }
}
