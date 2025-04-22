import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeViewComponent } from './code-view.component';
import { DemoBuilderService } from '../../services/demo-builder.service';
import { AlgoType } from '../../model/algo-type.model';
import { FrameComponent } from '../frame/frame.component';
import { By } from '@angular/platform-browser';
import { Demo } from '../../model/demo.model';

describe('CodeViewComponent', () => {
  let component: CodeViewComponent;
  let nativeElement: any;
  let hostFixture: ComponentFixture<FrameComponent>;
  let hostComponent: FrameComponent;
  let demoBuilder: DemoBuilderService;
  let testDemo: Demo;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeViewComponent, FrameComponent]
    })
    .compileComponents();

    hostFixture = TestBed.createComponent(FrameComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
    component = hostFixture.debugElement.query(By.directive(CodeViewComponent)).componentInstance;
    nativeElement = hostFixture.debugElement.query(By.directive(CodeViewComponent)).nativeElement;
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

  it('should update demo property when host property changed', () => {
    hostComponent.demo = testDemo;
    hostFixture.detectChanges();
    expect(component.demo()).toBe(testDemo);
  });

  it('should print pseudo code', () => {
    hostComponent.demo = testDemo;
    hostFixture.detectChanges();
    const compiled = nativeElement as HTMLElement;
    expect(compiled.querySelector('li')?.textContent).toContain('count = 0');
  });

  it('should highlight current line', () => {
    hostComponent.demo = testDemo;
    hostFixture.detectChanges();
    const compiled = nativeElement as HTMLElement;
    expect(compiled.querySelector('.selected')?.textContent).toContain('count = 0');
  });

  it('should print keywrods bold', () => {
    hostComponent.demo = testDemo;
    hostFixture.detectChanges();
    const compiled = nativeElement as HTMLElement;
    let text:string[] = [];
    compiled.querySelectorAll('b').forEach(node => text.push(node.innerText));
    expect(text).toContain('for');
    expect(text).toContain('do');
    expect(text).toContain('if');
    expect(text).toContain('then');
    expect(text).toContain('end');
    expect(text).toContain('return');
  });
});
