import { Component, inject, input, model, OnInit, output } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { GraphData } from '../../../model/graph-data.model';
import { GraphComponent } from "../../graph/graph.component";
import { GraphConverterService } from '../../../services/graph-converter.service';

@Component({
  selector: 'matrix-form',
  imports: [ReactiveFormsModule, MatCheckboxModule, MatButtonModule],
  templateUrl: './matrix-form.component.html',
  styleUrl: './matrix-form.component.scss'
})
export class MatrixFormComponent implements OnInit {
  newGraph = model<GraphData>()
  onFromComplete = output<void>()
  onPreviousStep = output<void>()

  gcs: GraphConverterService = inject(GraphConverterService);

  ngOnInit(): void {
    if (!this.newGraph()) {
      throw new Error('Graph is undefined.');
    }
    let n = this.newGraph()?.numOfNodes ?? 0;
    for (let i = 0; i < n * n; i++) {
      this.addMatrixElement()
      if (Math.floor(i / n) >= i % n) {
        this.matrix.at(i).disable()
      }
    }
  }

  private formBuilder = inject(FormBuilder);
  matrixForm = this.formBuilder.group({
    matrix: this.formBuilder.array([]),
  });

  get matrix() {
    return this.matrixForm.get('matrix') as FormArray;
  }

  addMatrixElement() {
    this.matrix.push(this.formBuilder.control(false));
  }

  getGraph() {
    let matrixArray: number[] = (this.matrix.value as boolean[]).map(x => x ? 1 : 0);
    return this.gcs.ArrayToNodes(matrixArray, this.newGraph()?.numOfNodes ?? 0);
  }

  onSubmit() {
    this.matrix.enable();
    let matrixArray: number[] = (this.matrix.value as boolean[]).map(x => x ? 1 : 0);
    this.matrix.disable();

    this.newGraph.update(oldValue => {
      return oldValue ? {
        name: oldValue.name,
        numOfNodes: oldValue.numOfNodes,
        matrixArray: matrixArray
      } : undefined;
    })
    this.onFromComplete.emit();
  }

  onPrevious() {
    this.onPreviousStep.emit()
  }
}
