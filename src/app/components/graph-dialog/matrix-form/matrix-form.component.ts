import { Component, inject, input, OnInit, output } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'matrix-form',
  imports: [ReactiveFormsModule, MatCheckboxModule, MatButtonModule],
  templateUrl: './matrix-form.component.html',
  styleUrl: './matrix-form.component.scss'
})
export class MatrixFormComponent implements OnInit {
  numOfNodes = input(3)
  matrixArray = output<number[]>()
  previousStep = output<void>()

  ngOnInit(): void {
    let n = this.numOfNodes()
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

  onSubmit() {
    this.matrix.enable();
    let matrixArray = (this.matrix.value as boolean[]).map(x => x ? 1 : 0);
    this.matrix.disable();
    this.matrixArray.emit(matrixArray);
  }

  back() {
    this.previousStep.emit()
  }
}
