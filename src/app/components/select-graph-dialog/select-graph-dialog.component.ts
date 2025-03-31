import { Component, inject, model } from '@angular/core';
import { GraphData } from '../../model/graph-data.model';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CookieService } from '../../services/cookie.service';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-select-graph-dialog',
  imports: [MatDialogModule, MatRadioModule, FormsModule, MatButtonModule, MatListModule, MatIconModule, MatMenuModule],
  templateUrl: './select-graph-dialog.component.html',
  styleUrl: './select-graph-dialog.component.scss'
})
export class SelectGraphDialogComponent {
  readonly dialogRef = inject(MatDialogRef<SelectGraphDialogComponent>);
  readonly data = inject<GraphData>(MAT_DIALOG_DATA);
  private snackBar = inject(MatSnackBar);
  readonly algo = model(this.data);
  private cookieService = inject(CookieService);

  get graphs() {
    return this.cookieService.getAllGraphs();
  }

  deleteGraph(name: string) {
    if (this.cookieService.deleteGraph(name)) {
      this.openSnackBar('Graph "' + name + '" was deleted.', "OK");
    } else {
      this.openSnackBar("Something went wrong.", "OK");
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }
}
