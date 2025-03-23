import { Injectable } from '@angular/core';
import { Node as Nodee } from '../model/node.model';

@Injectable({
  providedIn: 'root'
})
export class ObjectConverterService {

  objectToArray(variableObject: object): any[] {
    let keys = Object.keys(variableObject);
    let values = Object.values(variableObject);
    let array = []
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];

      array.push({ key: key, value: this.simplifyNodes(values[i]) });

    }
    return array;
  }

  simplifyNodes(value: any): any {
    if (typeof value === 'object' && 'id' in value) {
      return { id: value.id };
    }
    else if (Array.isArray(value)) {
      return value.map(v => this.simplifyNodes(v));
    }
    return value;
  }
}
