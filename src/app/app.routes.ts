import { Routes } from '@angular/router';
import { FrameComponent } from './components/frame/frame.component';
import { GraphDialogComponent } from './components/graph-dialog/graph-dialog.component';

export const routes: Routes = [
  {path: '', component: FrameComponent},
  {path: 'form', component: GraphDialogComponent},
];
