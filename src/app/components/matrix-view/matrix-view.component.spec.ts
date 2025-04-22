import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixViewComponent } from './matrix-view.component';
import { FrameComponent } from '../frame/frame.component';
import { By } from '@angular/platform-browser';
import { DemoBuilderService } from '../../services/demo-builder.service';
import { Demo } from '../../model/demo.model';
import { AlgoType } from '../../model/algo-type.model';

describe('MatrixViewComponent', () => {
  let component: MatrixViewComponent;
  let nativeElement: any;
  let hostFixture: ComponentFixture<FrameComponent>;
  let hostComponent: FrameComponent;
  let demoBuilder: DemoBuilderService;
  let testDemo: Demo;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatrixViewComponent, FrameComponent]
    })
      .compileComponents();

    hostFixture = TestBed.createComponent(FrameComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
    component = hostFixture.debugElement.query(By.directive(MatrixViewComponent)).componentInstance;
    nativeElement = hostFixture.debugElement.query(By.directive(MatrixViewComponent)).nativeElement;
    demoBuilder = TestBed.inject(DemoBuilderService);
    testDemo = demoBuilder
      .setAlgorithm(AlgoType.Node)
      .setGraph({
        nodes: [{ id: 0 }, { id: 1 }, { id: 2 }],
        links: [
          { source: { id: 0 }, target: { id: 1 } },
          { source: { id: 0 }, target: { id: 2 } },
          { source: { id: 1 }, target: { id: 2 } }
        ]
      })
      .build();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update matrix property when host property changed', () => {
    let testMatrix = [[0, 1, 1], [0, 0, 1], [0, 0, 0]];
    hostComponent.graphMatrix = testMatrix;
    hostFixture.detectChanges();
    expect(component.matrix()).toBe(testMatrix);
  });

  it('should print matrix', () => {
    let testMatrix = [[0, 1, 1], [0, 0, 1], [0, 0, 0]];
    hostComponent.graphMatrix = testMatrix;
    hostFixture.detectChanges();
    const compiled = nativeElement as HTMLElement;
    let text: string[] = [];
    compiled.querySelectorAll('td').forEach(node => text.push(node.textContent ?? ''));
    expect(text).toEqual([' 0 ', ' 1 ', ' 1 ', ' 0 ', ' 0 ', ' 1 ', ' 0 ', ' 0 ', ' 0 ']);
  });

  it('should highlight selected', () => {
    let testMatrix = [[0, 1, 1], [0, 0, 1], [0, 0, 0]];
    hostComponent.graphMatrix = testMatrix;
    hostComponent.demo = testDemo;
    hostComponent.currentStep = 3;
    hostFixture.detectChanges();
    const compiled = nativeElement as HTMLElement;
    let text: string[] = [];
    compiled.querySelectorAll('.selected').forEach(node => text.push(node.textContent ?? ''));
    expect(text).toEqual([' 1 ']);
  });
});
