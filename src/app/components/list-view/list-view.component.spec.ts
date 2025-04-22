import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListViewComponent } from './list-view.component';
import { FrameComponent } from '../frame/frame.component';
import { DemoBuilderService } from '../../services/demo-builder.service';
import { Demo } from '../../model/demo.model';
import { By } from '@angular/platform-browser';
import { AlgoType } from '../../model/algo-type.model';

describe('ListViewComponent', () => {
  let component: ListViewComponent;
  let nativeElement: any;
  let hostFixture: ComponentFixture<FrameComponent>;
  let hostComponent: FrameComponent;
  let demoBuilder: DemoBuilderService;
  let testDemo: Demo;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListViewComponent, FrameComponent]
    })
      .compileComponents();

    hostFixture = TestBed.createComponent(FrameComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
    demoBuilder = TestBed.inject(DemoBuilderService);
    testDemo = demoBuilder
      .setAlgorithm(AlgoType.Link)
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
    hostComponent.demo = testDemo;
    hostComponent.algo = AlgoType.Link;
    hostFixture.detectChanges();
    component = hostFixture.debugElement.query(By.directive(ListViewComponent)).componentInstance;
    expect(component).toBeTruthy();
  });

  it('should print list', () => {
    hostComponent.demo = testDemo;
    hostComponent.graphList = [[1, 2], [0, 2], [0, 1]];
    hostComponent.algo = AlgoType.Link;
    hostFixture.detectChanges();
    component = hostFixture.debugElement.query(By.directive(ListViewComponent)).componentInstance;
    nativeElement = hostFixture.debugElement.query(By.directive(ListViewComponent)).nativeElement;
    const compiled = nativeElement as HTMLElement;
    let text: string[] = [];
    compiled.querySelectorAll('td').forEach(node => text.push(node.textContent ?? ''));
    expect(text).toEqual([' 1 ', ' 2 ', ' 0 ', ' 2 ', ' 0 ', ' 1 ']);
  });

  it('should highlight selected', () => {
    hostComponent.demo = testDemo;
    hostComponent.graphList = [[1, 2], [0, 2], [0, 1]];
    hostComponent.currentStep = 3;
    hostComponent.algo = AlgoType.Link;
    hostFixture.detectChanges();
    component = hostFixture.debugElement.query(By.directive(ListViewComponent)).componentInstance;
    nativeElement = hostFixture.debugElement.query(By.directive(ListViewComponent)).nativeElement;
    const compiled = nativeElement as HTMLElement;
    let text: string[] = [];
    compiled.querySelectorAll('.selected').forEach(node => text.push(node.textContent ?? ''));
    expect(text).toEqual([' 2 ']);
  });
});
