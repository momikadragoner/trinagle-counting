import { TestBed } from '@angular/core/testing';

import { GraphConverterService } from './graph-converter.service';
import { Graph } from '../model/graph.model';

describe('ArrayToMatrixConverter', () => {
  let service: GraphConverterService;
  let matrix: number[][];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphConverterService);
    matrix = service.arrayToMatrix([0, 0, 0, 0], 2);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an array', () => {
    expect(Array.isArray(matrix)).toBeTrue();
  });

  it('should return an array of arrays', () => {
    matrix.forEach(array => {
      expect(Array.isArray(array)).toBeTrue();
    })
  });

  it('should return correct value', () => {
    expect(matrix).toEqual([[0, 0], [0, 0]]);
  });

});

describe('MatrixToNodesConverter', () => {
  let service: GraphConverterService;
  let graph: Graph;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphConverterService);
    graph = service.matrixToNodes([[0, 1], [0, 0]]);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an object', () => {
    expect(graph).toBeDefined();
  });

  it('should return an objec with array property nodes', () => {
    expect(Array.isArray(graph.nodes)).toBeTrue();
  });

  it('should have nodes with id poroperty', () => {
    graph.nodes.forEach(obj => {
      expect(obj.id).toBeDefined();
    })
  });

  it('should have nodes with number id poroperty', () => {
    graph.nodes.forEach(obj => {
      expect(typeof obj.id).toBe('number');
    })
  });

  it('should have nodes with correct number id poroperty', () => {
    let expectedValues = [0, 1];
    for (let i = 0; i < graph.nodes.length; i++) {
      expect(graph.nodes[i].id).toEqual(expectedValues[i])
    }
  });

  it('should return an objec with array property links', () => {
    expect(Array.isArray(graph.links)).toBeTrue();
  });

  it('should have links with source poroperty', () => {
    graph.links.forEach(obj => {
      expect(obj.source).toBeDefined();
    })
  });

  it('should have links with Node source poroperty', () => {
    graph.links.forEach(obj => {
      expect(obj.source.id).toBeDefined();
    })
  });

  it('should have links with target poroperty', () => {
    graph.links.forEach(obj => {
      expect(obj.target).toBeDefined();
    })
  });

  it('should have links with Node target poroperty', () => {
    graph.links.forEach(obj => {
      expect(obj.target.id).toBeDefined();
    })
  });

  it('should have correct link', () => {
    expect(graph.links[0].source.id).toEqual(0);
    expect(graph.links[0].target.id).toEqual(1);
  });
});

describe('MatrixToListConverter', () => {
  let service: GraphConverterService;
  let list: number[][];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphConverterService);
    list = service.matrixToList([[0, 1], [0, 0]])
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an array', () => {
    expect(Array.isArray(list)).toBeTrue();
  });

  it('should return an array of arrays', () => {
    list.forEach(array => {
      expect(Array.isArray(array)).toBeTrue();
    })
  });

  it('should return correct value', () => {
    expect(list).toEqual([[1], [0]]);
  });

});
