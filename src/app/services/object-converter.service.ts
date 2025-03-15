import { Injectable } from '@angular/core';

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
      array.push({key:key, value:values[i]});

      // if (typeof(values[i]) == 'object') {
      //   array.push({key: key, value: this.objectToArray(values[i])});
      // }
      // else {
      //   array.push([key, values[i]]);
      // }
    }
    return array;
  }
}
