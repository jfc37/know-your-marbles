import { first } from 'rxjs/operators';
import { Diagram } from '../diagram';
import { Operations } from '../operation-map';
import { compareWithExpected, compareWithRxjs } from './operation.utils.spec';

describe('first', () => {
  it('check "-----" has same output as rxjs', () => {
    compareWithRxjs(Diagram.create('-----'), Operations.First, first());
  });

  it('check "----|" has same output as rxjs', () => {
    compareWithRxjs(Diagram.create('----|'), Operations.First, first());
  });

  it('check "2-1--" has same output as rxjs', () => {
    compareWithRxjs(
      Diagram.create('-a-b--', { a: 2, b: 1 }),
      Operations.First,
      first()
    );
  });

  it('should be "--(1|)" when input is "--(13)-2-"', () => {
    const input = Diagram.create('--(ab)-c-', { a: 1, b: 3, c: 2 });
    const expectedOutput = Diagram.create('--(a|)', { a: 1 });

    compareWithExpected(input, Operations.First, expectedOutput);
  });
});
