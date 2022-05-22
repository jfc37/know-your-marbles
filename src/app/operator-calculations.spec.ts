import { cold } from 'jasmine-marbles';
import {
  first,
  max,
  merge,
  min,
  MonoTypeOperatorFunction,
  ObservableInput,
  OperatorFunction,
  takeUntil,
} from 'rxjs';
import { getCalculationFn } from './operator-calculations';
import { MarbleDiagram, Operations } from './types';

describe('first', () => {
  it('check "-----" has same output as rxjs', () => {
    compareWithRxjs(
      {
        diagram: '-----',
        values: {},
      },
      Operations.First,
      first()
    );
  });

  // TODO: Need to implement errors
  xit('check "----|" has same output as rxjs', () => {
    compareWithRxjs(
      {
        diagram: '----|',
        values: {},
      },
      Operations.First,
      first()
    );
  });

  it('check "2-1--" has same output as rxjs', () => {
    compareWithRxjs(
      {
        diagram: '-a-b--',
        values: { a: 2, b: 1 },
      },
      Operations.First,
      first()
    );
  });

  it('should be "--(1|)" when input is "--(13)-2-"', () => {
    const input = {
      diagram: '--(ab)-c-',
      values: { a: 1, b: 3, c: 2 },
    };
    const expectedOutput = {
      diagram: '--(a|)',
      values: { a: 1 },
    };

    compareWithExpected(input, Operations.First, expectedOutput);
  });
});

describe('max', () => {
  it('check "-----" has same output as rxjs', () => {
    compareWithRxjs(
      {
        diagram: '-----',
        values: {},
      },
      Operations.Max,
      max()
    );
  });

  it('check "----|" has same output as rxjs', () => {
    compareWithRxjs(
      {
        diagram: '----|',
        values: {},
      },
      Operations.Max,
      max()
    );
  });

  it('check "2-1--" has same output as rxjs', () => {
    compareWithRxjs(
      {
        diagram: 'a-b-|',
        values: { a: 2, b: 1 },
      },
      Operations.Max,
      max()
    );
  });

  it('should be "----(3|)" when input is "(13)-2-|"', () => {
    const input = {
      diagram: '(ab)-c-|',
      values: { a: 1, b: 3, c: 2 },
    };
    const expectedOutput = {
      diagram: '----(a|)',
      values: { a: 3 },
    };

    compareWithExpected(input, Operations.Max, expectedOutput);
  });
});

describe('min', () => {
  it('check "-----" has same output as rxjs', () => {
    compareWithRxjs(
      {
        diagram: '-----',
        values: {},
      },
      Operations.Min,
      min()
    );
  });

  it('check "----|" has same output as rxjs', () => {
    compareWithRxjs(
      {
        diagram: '----|',
        values: {},
      },
      Operations.Min,
      min()
    );
  });

  it('check "2-1--" has same output as rxjs', () => {
    compareWithRxjs(
      {
        diagram: 'a-b-|',
        values: { a: 2, b: 1 },
      },
      Operations.Min,
      min()
    );
  });

  it('should be "----(1|)" when input is "(21)-3-|"', () => {
    const input = {
      diagram: '(ab)-c-|',
      values: { a: 2, b: 1, c: 3 },
    };
    const expectedOutput = {
      diagram: '----(a|)',
      values: { a: 1 },
    };

    compareWithExpected(input, Operations.Min, expectedOutput);
  });
});

describe('take until', () => {
  it('check "abcde" | "----" has same output as rxjs', () => {
    binaryCompareWithRxjs(
      {
        diagram: 'abcde',
        values: { a: 1, b: 2, c: 3, d: 4, e: 5 },
      },
      Operations.TakeUntil,
      {
        diagram: '----',
        values: {},
      },
      takeUntil
    );
  });

  it('check "abcde" | "--|" has same output as rxjs', () => {
    binaryCompareWithRxjs(
      {
        diagram: 'abcde',
        values: { a: 1, b: 2, c: 3, d: 4, e: 5 },
      },
      Operations.TakeUntil,
      {
        diagram: '--|',
        values: {},
      },
      takeUntil
    );
  });

  it('check "abcde" | "--f-g" has same output as rxjs', () => {
    binaryCompareWithRxjs(
      {
        diagram: 'abcde',
        values: { a: 1, b: 2, c: 3, d: 4, e: 5 },
      },
      Operations.TakeUntil,
      {
        diagram: '--f-g',
        values: { f: 1, g: 1 },
      },
      takeUntil
    );
  });
});

function compareWithRxjs<TInput, TOutput>(
  marbleDiagram: MarbleDiagram,
  operation: Operations,
  rxjsOperation: OperatorFunction<TInput, TOutput>
): void {
  const realInput = cold(marbleDiagram.diagram, marbleDiagram.values);
  const realOutput = realInput.pipe(rxjsOperation);

  const simulatedOutput = getCalculationFn(operation)(marbleDiagram);
  expect(realOutput).toBeObservable(
    cold(simulatedOutput.diagram, simulatedOutput.values)
  );
}

function binaryCompareWithRxjs<TOutput>(
  primaryMarbleDiagram: MarbleDiagram,
  operation: Operations,
  secondaryMarbleDiagram: MarbleDiagram,
  rxjsOperation: (
    notifier: ObservableInput<any>
  ) => MonoTypeOperatorFunction<TOutput>
): void {
  const realPrimaryInput = cold(
    primaryMarbleDiagram.diagram,
    primaryMarbleDiagram.values
  );
  const realSecondaryInput = cold(
    secondaryMarbleDiagram.diagram,
    secondaryMarbleDiagram.values
  );
  const realOutput = realPrimaryInput.pipe(rxjsOperation(realSecondaryInput));

  const simulatedOutput = getCalculationFn(operation)(
    primaryMarbleDiagram,
    secondaryMarbleDiagram
  );
  expect(realOutput).toBeObservable(
    cold(simulatedOutput.diagram, simulatedOutput.values)
  );
}

function compareWithExpected(
  marbleDiagram: MarbleDiagram,
  operation: Operations,
  expectedOutput: MarbleDiagram
): void {
  const simulatedOutput = getCalculationFn(operation)(marbleDiagram);
  expect(cold(simulatedOutput.diagram, simulatedOutput.values)).toBeObservable(
    cold(expectedOutput.diagram, expectedOutput.values)
  );
}
