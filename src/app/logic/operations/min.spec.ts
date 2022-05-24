import { min } from 'rxjs/operators';
import { Diagram } from '../diagram';
import { Operations } from '../operation-map';
import { compareWithExpected, compareWithRxjs } from './operation.utils.spec';

describe('min', () => {
  it('check "-----" has same output as rxjs', () => {
    compareWithRxjs(Diagram.create('-----'), Operations.Min, min());
  });

  it('check "----|" has same output as rxjs', () => {
    compareWithRxjs(Diagram.create('----|'), Operations.Min, min());
  });

  it('check "2-1--" has same output as rxjs', () => {
    compareWithRxjs(
      Diagram.create('a-b-|', { a: 2, b: 1 }),
      Operations.Min,
      min()
    );
  });

  it('should be "----(1|)" when input is "(21)-3-|"', () => {
    const input = Diagram.create('(ab)-c-|', { a: 2, b: 1, c: 3 });
    const expectedOutput = Diagram.create('----(a|)', { a: 1 });

    compareWithExpected(input, Operations.Min, expectedOutput);
  });
});
