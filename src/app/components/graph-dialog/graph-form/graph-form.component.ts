import { Component, inject, model, OnInit, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { GraphDialogData } from '../graph-dialog-data.model';

@Component({
  selector: 'graph-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule ],
  templateUrl: './graph-form.component.html',
  styleUrl: './graph-form.component.scss'
})
export class GraphFormComponent implements OnInit{
  ngOnInit(): void {
    this.graphForm.controls.name.setValue(this.newGraph()?.name ?? 'My Graph')
    this.graphForm.controls.numOfNodes.setValue(this.newGraph()?.numOfNodes ?? 3)
  }

  private formBuilder = inject(FormBuilder);
  onFormComplete = output<void>();
  newGraph = model<GraphDialogData>();
  graphForm = this.formBuilder.group({
    name: this.formBuilder.control('My Graph', Validators.required),
    numOfNodes: this.formBuilder.control(0, [Validators.required, Validators.min(3), Validators.max(20)])
  });

  onSubmit() {
    if (!this.graphForm.valid) {
      //error TODO
    } else {
      this.newGraph.update(oldValue => {
        return oldValue ? {
          name: this.graphForm.value.name ?? '',
          numOfNodes: Number(this.graphForm.value.numOfNodes),
          matrixArray: oldValue.matrixArray
        } : undefined;
      })
      this.onFormComplete.emit();
    }
  }
}
