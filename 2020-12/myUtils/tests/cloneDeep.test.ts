import {describe, test, expect} from '@jest/globals';
import { cloneDeep } from '../src/cloneDeep';

describe('cloneDeep', () => {
  test('should cloneDeep undefined', () => {
    let a;
    expect(a).toEqual(cloneDeep(a));
  })
});
