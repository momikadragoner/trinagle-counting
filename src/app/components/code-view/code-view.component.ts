import { Component, OnChanges, OnInit, SimpleChanges, input, model } from '@angular/core';
import { MediaControlComponent } from "../media-control/media-control.component";
import { Demo } from '../../model/demo.model';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'code-view',
  imports: [MediaControlComponent, JsonPipe],
  templateUrl: './code-view.component.html',
  styleUrl: './code-view.component.scss'
})
export class CodeViewComponent implements OnInit, OnChanges {

  demo = input<Demo>();
  currentStep = model<number>(0);
  stepCount: number | undefined = 0
  currentLine: Number | undefined = 0
  formattedCode: String[] | undefined = [];

  ngOnInit(): void {
    this.currentLine = this.demo()?.snapshotSequence[this.currentStep()].lineIndex;
    this.stepCount = (this.demo()?.snapshotSequence.length.valueOf() ?? 21) - 1;

    const keyWords = ['for', 'do', 'end', 'if', 'then', 'else', 'return'];
    let code = this.demo()?.pseudoCode;

    keyWords.forEach(w => {
      code = code?.replaceAll(w, '<b>' + w + '</b>');
    })
    this.formattedCode = code?.split('\n');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["currentStep"]) {
      let newValue = changes["currentStep"].currentValue
      this.currentLine = this.demo()?.snapshotSequence[newValue].lineIndex;
    }
  }
}
