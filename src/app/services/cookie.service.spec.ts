import { TestBed } from '@angular/core/testing';

import { CookieService } from './cookie.service';

describe('CookieService', () => {
  let service: CookieService;
  let testGraph = {
    name: 'Test Graph',
    numOfNodes: 3,
    matrixArray: [0, 1, 1, 0, 0, 1, 0, 0, 0]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save a graph', () => {
    service.deleteAllGraphs();
    service.saveGraph(testGraph);
    expect(service.isGraphSaved('Test Graph')).toBeTrue();
  });

  it('should retrive a graph', () => {
    service.deleteAllGraphs();
    service.saveGraph(testGraph);
    expect(service.getGraph('Test Graph')).toEqual(testGraph);
  });

  it('should throw error on conflicing graph names', () => {
    service.deleteAllGraphs();
    service.saveGraph(testGraph);
    expect(() => service.saveGraph(testGraph)).toThrowError('A graph with name "Test Graph" already exists.');
  });

  it('should save multiple graphs', () => {
    service.deleteAllGraphs();
    let testGraph2 = {
      name: 'Test Graph 2',
      numOfNodes: 3,
      matrixArray: [0, 1, 1, 0, 1, 1, 0, 0, 0]
    };
    service.saveGraph(testGraph);
    service.saveGraph(testGraph2);
    expect(service.isGraphSaved('Test Graph')).toBeTrue();
    expect(service.isGraphSaved('Test Graph 2')).toBeTrue();
  });

  it('should retrive multiple graphs', () => {
    service.deleteAllGraphs();
    let testGraph2 = {
      name: 'Test Graph 2',
      numOfNodes: 3,
      matrixArray: [0, 1, 1, 0, 1, 1, 0, 0, 0]
    };
    let testGraphs = [testGraph, testGraph2];
    service.saveGraph(testGraph);
    service.saveGraph(testGraph2);
    expect(service.getAllGraphs()).toEqual(testGraphs);
  });
});
