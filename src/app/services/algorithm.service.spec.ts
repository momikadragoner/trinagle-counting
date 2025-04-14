import { TestBed } from '@angular/core/testing';

import { AlgorithmService } from './algorithm.service';
import { Graph } from '../model/graph.model';
import { GraphConverterService } from './graph-converter.service';

describe('AlgorithmService', () => {
  let service: AlgorithmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlgorithmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('NodeIteratorAlgorithm', () => {
  let service: AlgorithmService;
  let converter: GraphConverterService;
  let graph: Graph;
  let numberOfTriangles:number;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlgorithmService);
    converter = TestBed.inject(GraphConverterService);
    graph = converter.arrayToNodes([0, 1, 1, 0, 0, 1, 0, 0, 0], 3);
    numberOfTriangles = service.nodeIteratorTrinagleCount(graph);
  });

  it('should count a trinagle', () => {
    graph = converter.arrayToNodes([0, 1, 1, 0, 0, 1, 0, 0, 0], 3);
    expect(service.nodeIteratorTrinagleCount(graph)).toEqual(1);
  });

  it('should count two trinagles', () => {
    graph = converter.arrayToNodes([0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], 4);
    expect(service.nodeIteratorTrinagleCount(graph)).toEqual(2);
  });

  it('should count no trinagles in a line', () => {
    graph = converter.arrayToNodes([0, 1, 1, 0, 0, 0, 0, 0, 0], 3);
    expect(service.nodeIteratorTrinagleCount(graph)).toEqual(0);
  });

  it('should have SnapshotSequence getter return an array', () => {
    expect(Array.isArray(service.getSnapshotSequence())).toBeTrue();
  });

  it('should have SnapshotSequence getter return an array of correct length', () => {
    expect(service.getSnapshotSequence().length).toEqual(21);
  });

  it('should have SnapshotSequence be list of Snapshots', () => {
    service.getSnapshotSequence().forEach(snapshot => {
      expect(typeof snapshot.lineIndex).toBe('number');
      expect(Array.isArray(snapshot.usedLinks)).toBeTrue;
      expect(Array.isArray(snapshot.usedNodes)).toBeTrue;
    });
  });

  it('should have SnapshotSequence begin counting lines from zero', () => {
    expect(service.getSnapshotSequence()[0].lineIndex).toEqual(0);
  });

  it('should have SnapshotSequence begin with no used links', () => {
    expect(service.getSnapshotSequence()[0].usedLinks).toEqual([]);
  });

  it('should have SnapshotSequence begin with no used nodes', () => {
    expect(service.getSnapshotSequence()[0].usedNodes).toEqual([]);
  });

  it('should have SnapshotSequence end with a result', () => {
    expect(service.getSnapshotSequence()[20].variables.result).toBeDefined()
  });

  it('should have SnapshotSequence end with correct result', () => {
    expect(service.getSnapshotSequence()[20].variables.result).toEqual(1);
  });
});

describe('NodeIteratorAlgorithm', () => {
  let service: AlgorithmService;
  let converter: GraphConverterService;
  let graph: number[][];
  let numberOfTriangles:number;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlgorithmService);
    converter = TestBed.inject(GraphConverterService);
    graph = converter.arrayToList([0, 1, 1, 0, 0, 1, 0, 0, 0], 3);
    numberOfTriangles = service.edgeIteratorTrinagleCount(graph);
  });

  it('should count a trinagle', () => {
    graph = converter.arrayToList([0, 1, 1, 0, 0, 1, 0, 0, 0], 3);
    expect(service.edgeIteratorTrinagleCount(graph)).toEqual(1);
  });

  it('should count two trinagles', () => {
    graph = converter.arrayToList([0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], 4);
    expect(service.edgeIteratorTrinagleCount(graph)).toEqual(2);
  });

  it('should count no trinagles in a line', () => {
    graph = converter.arrayToList([0, 1, 1, 0, 0, 0, 0, 0, 0], 3);
    expect(service.edgeIteratorTrinagleCount(graph)).toEqual(0);
  });

  it('should have SnapshotSequence getter return an array', () => {
    expect(Array.isArray(service.getSnapshotSequence())).toBeTrue();
  });

  it('should have SnapshotSequence getter return an array of correct length', () => {
    expect(service.getSnapshotSequence().length).toEqual(18);
  });

  it('should have SnapshotSequence be list of Snapshots', () => {
    service.getSnapshotSequence().forEach(snapshot => {
      expect(typeof snapshot.lineIndex).toBe('number');
      expect(Array.isArray(snapshot.usedLinks)).toBeTrue;
      expect(Array.isArray(snapshot.usedNodes)).toBeTrue;
    });
  });

  it('should have SnapshotSequence begin counting lines from zero', () => {
    expect(service.getSnapshotSequence()[0].lineIndex).toEqual(0);
  });

  it('should have SnapshotSequence begin with no used links', () => {
    expect(service.getSnapshotSequence()[0].usedLinks).toEqual([]);
  });

  it('should have SnapshotSequence begin with no used nodes', () => {
    expect(service.getSnapshotSequence()[0].usedNodes).toEqual([]);
  });

  it('should have SnapshotSequence end with a result', () => {
    expect(service.getSnapshotSequence()[17].variables.result).toBeDefined()
  });

  it('should have SnapshotSequence end with correct result', () => {
    expect(service.getSnapshotSequence()[17].variables.result).toEqual(1);
  });
});

describe('MatrixMultiplicationAlgorithm', () => {
  let service: AlgorithmService;
  let converter: GraphConverterService;
  let graph: number[][];
  let numberOfTriangles:number;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlgorithmService);
    converter = TestBed.inject(GraphConverterService);
    graph = converter.arrayToMatrix([0, 1, 1, 0, 0, 1, 0, 0, 0], 3);
    numberOfTriangles = service.matrixMultiplicationTriangleCount(graph);
  });

  it('should count a trinagle', () => {
    graph = converter.arrayToMatrix([0, 1, 1, 0, 0, 1, 0, 0, 0], 3);
    expect(service.matrixMultiplicationTriangleCount(graph)).toEqual(1);
  });

  it('should count two trinagles', () => {
    graph = converter.arrayToMatrix([0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], 4);
    expect(service.matrixMultiplicationTriangleCount(graph)).toEqual(2);
  });

  it('should count no trinagles in a line', () => {
    graph = converter.arrayToMatrix([0, 1, 1, 0, 0, 0, 0, 0, 0], 3);
    expect(service.matrixMultiplicationTriangleCount(graph)).toEqual(0);
  });

  it('should have SnapshotSequence getter return an array', () => {
    expect(Array.isArray(service.getSnapshotSequence())).toBeTrue();
  });

  it('should have SnapshotSequence getter return an array of correct length', () => {
    expect(service.getSnapshotSequence().length).toEqual(28);
  });

  it('should have SnapshotSequence be list of Snapshots', () => {
    service.getSnapshotSequence().forEach(snapshot => {
      expect(typeof snapshot.lineIndex).toBe('number');
      expect(Array.isArray(snapshot.usedLinks)).toBeTrue;
      expect(Array.isArray(snapshot.usedNodes)).toBeTrue;
    });
  });

  it('should have SnapshotSequence begin counting lines from zero', () => {
    expect(service.getSnapshotSequence()[0].lineIndex).toEqual(0);
  });

  it('should have SnapshotSequence begin with no used links', () => {
    expect(service.getSnapshotSequence()[0].usedLinks).toEqual([]);
  });

  it('should have SnapshotSequence begin with no used nodes', () => {
    expect(service.getSnapshotSequence()[0].usedNodes).toEqual([]);
  });

  it('should have SnapshotSequence end with a result', () => {
    expect(service.getSnapshotSequence()[27].variables.result).toBeDefined()
  });

  it('should have SnapshotSequence end with correct result', () => {
    expect(service.getSnapshotSequence()[27].variables.result).toEqual(1);
  });
});
