import { cold } from 'jasmine-marbles';
import { min } from 'rxjs';
import { minCalculation } from './operator-calculations';
import { MarbleDiagram } from './types';

describe('minCalculation', () => {
  it('should be "--" when input is "--"', () => {
    const input: MarbleDiagram = {
      diagram: '--',
      values: {},
    };

    const output = minCalculation(input);

    expect(output.diagram).toBe('--');
    expect(output.values).toEqual({});
  });

  it('should be "----(1|)" when input is "(2)-(1)-(|)"', () => {
    const input: MarbleDiagram = {
      diagram: 'a-b-|',
      values: { a: 2, b: 1 },
    };

    const actualInput = cold(input.diagram, input.values);
    const actualOutput = actualInput.pipe(min());
    const expectedOutput = cold('----(a|)', { a: 1 });

    expect(actualOutput).toBeObservable(expectedOutput);
    // const output = minCalculation(input);
    // expect(cold(output.diagram, { a: 1 })).toBeObservable(expectedOutput);
  });
});
