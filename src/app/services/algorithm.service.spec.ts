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
  let graph: Graph;
  let numberOfTriangles: number;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlgorithmService);
    graph = {
      nodes: [{ id: 0 }, { id: 1 }, { id: 2 }],
      links: [
        { source: { id: 0 }, target: { id: 1 } },
        { source: { id: 0 }, target: { id: 2 } },
        { source: { id: 1 }, target: { id: 2 } }
      ]
    };
    numberOfTriangles = service.nodeIteratorTriangleCount(graph);
  });

  it('should find no triangles in empty graph', () => {
    graph = { nodes: [], links: [] };
    expect(service.nodeIteratorTriangleCount(graph)).toEqual(0);
  });

  it('should find no triangles in single vertex', () => {
    graph = { nodes: [{ id: 0 }], links: [] };
    expect(service.nodeIteratorTriangleCount(graph)).toEqual(0);
  });

  it('should find no triangles in single edge', () => {
    graph = { nodes: [{ id: 0 }, { id: 1 }], links: [{ source: { id: 0 }, target: { id: 1 } }] };
    expect(service.nodeIteratorTriangleCount(graph)).toEqual(0);
  });

  it('should find no triangles in a line', () => {
    graph = {
      nodes: [{ id: 0 }, { id: 1 }, { id: 2 }],
      links: [
        { source: { id: 0 }, target: { id: 1 } },
        { source: { id: 1 }, target: { id: 2 } }
      ]
    };
    expect(service.nodeIteratorTriangleCount(graph)).toEqual(0);
  });

  it('should find no triangles in a star', () => {
    graph = {
      nodes: [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }],
      links: [
        { source: { id: 0 }, target: { id: 1 } },
        { source: { id: 0 }, target: { id: 2 } },
        { source: { id: 0 }, target: { id: 3 } }
      ]
    };
    expect(service.nodeIteratorTriangleCount(graph)).toEqual(0);
  });

  it('should count a triangle', () => {
    graph = {
      nodes: [{ id: 0 }, { id: 1 }, { id: 2 }],
      links: [
        { source: { id: 0 }, target: { id: 1 } },
        { source: { id: 0 }, target: { id: 2 } },
        { source: { id: 1 }, target: { id: 2 } }
      ]
    };
    expect(service.nodeIteratorTriangleCount(graph)).toEqual(1);
  });

  it('should count two triangles with a common edge', () => {
    graph = {
      nodes: [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }],
      links: [
        { source: { id: 0 }, target: { id: 1 } },
        { source: { id: 1 }, target: { id: 2 } },
        { source: { id: 2 }, target: { id: 0 } },
        { source: { id: 3 }, target: { id: 1 } },
        { source: { id: 3 }, target: { id: 2 } }
      ]
    };
    expect(service.nodeIteratorTriangleCount(graph)).toEqual(2);
  });

  it('should count two distinct triangles', () => {
    graph = {
      nodes: [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
      links: [
        { source: { id: 0 }, target: { id: 1 } },
        { source: { id: 1 }, target: { id: 2 } },
        { source: { id: 2 }, target: { id: 0 } },
        { source: { id: 3 }, target: { id: 4 } },
        { source: { id: 4 }, target: { id: 5 } },
        { source: { id: 5 }, target: { id: 3 } }
      ]
    };
    expect(service.nodeIteratorTriangleCount(graph)).toEqual(2);
  });

  it('should count two triangles sharing only a vertex', () => {
    graph = {
      nodes: [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
      links: [
        { source: { id: 0 }, target: { id: 1 } },
        { source: { id: 1 }, target: { id: 2 } },
        { source: { id: 2 }, target: { id: 0 } },
        { source: { id: 3 }, target: { id: 4 } },
        { source: { id: 4 }, target: { id: 2 } },
        { source: { id: 2 }, target: { id: 3 } }
      ]
    };
    expect(service.nodeIteratorTriangleCount(graph)).toEqual(2);
  });

  it('should count triangles in a complete graph', () => {
    graph = {
      nodes: [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }],
      links: [
        { source: { id: 0 }, target: { id: 1 } },
        { source: { id: 0 }, target: { id: 2 } },
        { source: { id: 0 }, target: { id: 3 } },
        { source: { id: 1 }, target: { id: 2 } },
        { source: { id: 1 }, target: { id: 3 } },
        { source: { id: 2 }, target: { id: 3 } },
      ]
    };
    expect(service.nodeIteratorTriangleCount(graph)).toEqual(4);
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

describe('EdgeIteratorAlgorithm', () => {
  let service: AlgorithmService;
  let graph: number[][];
  let numberOfTriangles: number;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlgorithmService);
    graph = [[1, 2], [2], []];
    numberOfTriangles = service.edgeIteratorTriangleCount(graph);
  });

  it('should find no triangles in empty graph', () => {
    graph = [];
    expect(service.edgeIteratorTriangleCount(graph)).toEqual(0);
  });

  it('should find no triangles in single vertex', () => {
    graph = [[]];
    expect(service.edgeIteratorTriangleCount(graph)).toEqual(0);
  });

  it('should find no triangles in single edge', () => {
    graph = [[0], [1]];
    expect(service.edgeIteratorTriangleCount(graph)).toEqual(0);
  });

  it('should find no triangles in a line', () => {
    graph = [[1], [0, 2], [1]];
    expect(service.edgeIteratorTriangleCount(graph)).toEqual(0);
  });

  it('should find no triangles in a star', () => {
    graph = [[1, 2, 3], [], [], []];
    expect(service.edgeIteratorTriangleCount(graph)).toEqual(0);
  });

  it('should count a trinagle', () => {
    graph = [[1, 2], [0, 2], [0, 1]];
    expect(service.edgeIteratorTriangleCount(graph)).toEqual(1);
  });

  it('should count two distinct triangles', () => {
    graph = [[1, 2], [0, 2], [0, 1], [4, 5], [3, 5], [3, 4]];
    expect(service.edgeIteratorTriangleCount(graph)).toEqual(2);
  });

  it('should count two triangles sharing an edge', () => {
    graph = [[1, 2], [0, 2, 3], [0, 1, 3], [1, 2]];
    expect(service.edgeIteratorTriangleCount(graph)).toEqual(2);
  });

  it('should count two triangles sharing only a vertex', () => {
    graph = [[1, 2], [0, 2], [0, 1, 3, 4], [4, 2], [3, 2]]
    expect(service.edgeIteratorTriangleCount(graph)).toEqual(2);
  });

  it('should count triangles in a complete graph', () => {
    graph = [[1, 2, 3], [0, 2, 3], [0, 1, 3], [0, 1, 2]];
    expect(service.edgeIteratorTriangleCount(graph)).toEqual(4);
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
  let graph: number[][];
  let numberOfTriangles: number;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlgorithmService);
    graph = [[0, 1, 1], [0, 0, 1], [0, 0, 0]];
    numberOfTriangles = service.matrixMultiplicationTriangleCount(graph);
  });

  it('should find no triangles in empty graph', () => {
    graph = [];
    expect(service.matrixMultiplicationTriangleCount(graph)).toEqual(0);
  });

  it('should find no triangles in single vertex', () => {
    graph = [[0]];
    expect(service.matrixMultiplicationTriangleCount(graph)).toEqual(0);
  });

  it('should find no triangles in single edge', () => {
    graph = [[0, 1], [0, 0]];
    expect(service.matrixMultiplicationTriangleCount(graph)).toEqual(0);
  });

  it('should count no trinagles in a line', () => {
    graph = [[0, 1, 1], [0, 0, 0], [0, 0, 0]];
    expect(service.matrixMultiplicationTriangleCount(graph)).toEqual(0);
  });

  it('should find no triangles in a star', () => {
    graph = [[0, 0, 0, 1], [0, 0, 0, 1], [0, 0, 0, 1], [0, 0, 0, 0]];
    expect(service.matrixMultiplicationTriangleCount(graph)).toEqual(0);
  });

  it('should count a trinagle', () => {
    graph = [[0, 1, 1], [0, 0, 1], [0, 0, 0]];
    expect(service.matrixMultiplicationTriangleCount(graph)).toEqual(1);
  });

  it('should count two distinct triangles', () => {
    graph = [
      [0, 1, 1, 0, 0, 0],
      [0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1],
      [0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0]
    ];
    expect(service.matrixMultiplicationTriangleCount(graph)).toEqual(2);
  });

  it('should count two trinagles two trinagles with a common edge', () => {
    graph = [[0, 1, 1, 1], [0, 0, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]];
    expect(service.matrixMultiplicationTriangleCount(graph)).toEqual(2);
  });

  it('should count two triangles sharing only a vertex', () => {
    graph = [
      [0, 1, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 1, 1],
      [0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0]
    ];
    expect(service.matrixMultiplicationTriangleCount(graph)).toEqual(2);
  });

  it('should count triangles in a complete graph', () => {
    graph = [
      [0, 1, 1, 1],
      [0, 0, 1, 1],
      [0, 0, 0, 1],
      [0, 0, 0, 0],
    ];
    expect(service.matrixMultiplicationTriangleCount(graph)).toEqual(4);
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
