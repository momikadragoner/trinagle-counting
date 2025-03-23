import { Component, inject, model } from '@angular/core';
import { GraphData } from '../../model/graph-data.model';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CookieService } from '../../services/cookie.service';

@Component({
  selector: 'app-select-graph-dialog',
  imports: [MatDialogModule, MatRadioModule, FormsModule, MatButtonModule],
  templateUrl: './select-graph-dialog.component.html',
  styleUrl: './select-graph-dialog.component.scss'
})
export class SelectGraphDialogComponent {
  readonly dialogRef = inject(MatDialogRef<SelectGraphDialogComponent>);
  readonly data = inject<GraphData>(MAT_DIALOG_DATA);
  readonly algo = model(this.data);
  private cookieService = inject(CookieService);

  get graphs() {
    return this.cookieService.getAllGraphs();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
