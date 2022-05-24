import { max } from 'rxjs/operators';
import { Diagram } from '../diagram';
import { Operations } from '../operation-map';
import { compareWithExpected, compareWithRxjs } from './test.utils';

describe('max', () => {
  it('check "-----" has same output as rxjs', () => {
    compareWithRxjs(Diagram.create('-----'), Operations.Max, max());
  });

  it('check "----|" has same output as rxjs', () => {
    compareWithRxjs(Diagram.create('----|'), Operations.Max, max());
  });

  it('check "2-1--" has same output as rxjs', () => {
    compareWithRxjs(
      Diagram.create('a-b-|', { a: 2, b: 1 }),
      Operations.Max,
      max()
    );
  });

  it('should be "----(3|)" when input is "(13)-2-|"', () => {
    const input = Diagram.create('(ab)-c-|', { a: 1, b: 3, c: 2 });
    const expectedOutput = Diagram.create('----(a|)', { a: 3 });

    compareWithExpected(input, Operations.Max, expectedOutput);
  });
});
