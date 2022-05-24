import { takeUntil } from 'rxjs/operators';
import { Diagram } from '../diagram';
import { Operations } from '../operation-map';
import { binaryCompareWithRxjs } from './test.utils';

describe('take until', () => {
  it('check "abcde" | "----" has same output as rxjs', () => {
    binaryCompareWithRxjs(
      Diagram.create('abcde', { a: 1, b: 2, c: 3, d: 4, e: 5 }),
      Operations.TakeUntil,
      Diagram.create('----'),
      takeUntil
    );
  });

  it('check "abcde" | "--|" has same output as rxjs', () => {
    binaryCompareWithRxjs(
      Diagram.create('abcde', { a: 1, b: 2, c: 3, d: 4, e: 5 }),
      Operations.TakeUntil,
      Diagram.create('--|'),
      takeUntil
    );
  });

  it('check "abcde" | "--f-g" has same output as rxjs', () => {
    binaryCompareWithRxjs(
      Diagram.create('abcde', { a: 1, b: 2, c: 3, d: 4, e: 5 }),
      Operations.TakeUntil,
      Diagram.create('--f-g', { f: 1, g: 1 }),
      takeUntil
    );
  });
});
