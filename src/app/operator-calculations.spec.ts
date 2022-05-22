import { cold } from 'jasmine-marbles';
import { min } from 'rxjs';
import { minCalculation } from './operator-calculations';

describe('minCalculation', () => {
  it('should be "-----" when input is "-----"', () => {
    const diagram = '-----';
    const values = { a: 2, b: 1 };

    runTest(diagram, values);
  });

  it('should be "----|" when input is "----|"', () => {
    const diagram = '----|';
    const values = {};

    runTest(diagram, values);
  });

  it('should be "----(1|)" when input is "2-1-|"', () => {
    const diagram = 'a-b-|';
    const values = { a: 2, b: 1 };

    runTest(diagram, values);
  });

  it('should be "----(1|)" when input is "(21)-3-|"', () => {
    const diagram = '(ab)-c-|';
    const values = { a: 2, b: 1, c: 3 };
    const expectedOutput = '----(a|)';
    const expectedValues = { a: 1 };

    runTestWithGrouping(diagram, values, expectedOutput, expectedValues);
  });

  function runTest(diagram: string, values: { [key: string]: number }): void {
    const realInput = cold(diagram, values);
    const realOutput = realInput.pipe(min());

    const simulatedOutput = minCalculation({
      diagram: diagram,
      values: values,
    });
    expect(realOutput).toBeObservable(
      cold(simulatedOutput.diagram, simulatedOutput.values)
    );
  }

  function runTestWithGrouping(
    diagram: string,
    values: { [key: string]: number },
    expectedOutput: string,
    expectedValues: { [key: string]: number }
  ): void {
    const simulatedOutput = minCalculation({
      diagram: diagram,
      values: values,
    });
    expect(
      cold(simulatedOutput.diagram, simulatedOutput.values)
    ).toBeObservable(cold(expectedOutput, expectedValues));
  }
});
