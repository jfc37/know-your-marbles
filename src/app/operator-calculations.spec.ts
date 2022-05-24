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
import { Diagram } from './logic/diagram';
import { getOperationFn, Operations } from './logic/operation-map';

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

function compareWithRxjs<TInput, TOutput>(
  diagram: Diagram,
  operation: Operations,
  rxjsOperation: OperatorFunction<TInput, TOutput>
): void {
  const realInput = cold(diagram.diagram, diagram.values);
  const realOutput = realInput.pipe(rxjsOperation);

  const simulatedOutput = getOperationFn(operation)(diagram);
  expect(realOutput).toBeObservable(
    cold(simulatedOutput.diagram, simulatedOutput.values, jasmine.anything())
  );
}

function binaryCompareWithRxjs<TOutput>(
  primaryDiagram: Diagram,
  operation: Operations,
  secondaryDiagram: Diagram,
  rxjsOperation: (
    notifier: ObservableInput<any>
  ) => MonoTypeOperatorFunction<TOutput>
): void {
  const realPrimaryInput = cold(primaryDiagram.diagram, primaryDiagram.values);
  const realSecondaryInput = cold(
    secondaryDiagram.diagram,
    secondaryDiagram.values
  );
  const realOutput = realPrimaryInput.pipe(rxjsOperation(realSecondaryInput));

  const simulatedOutput = getOperationFn(operation)(
    primaryDiagram,
    secondaryDiagram
  );
  expect(realOutput).toBeObservable(
    cold(simulatedOutput.diagram, simulatedOutput.values)
  );
}

function compareWithExpected(
  diagram: Diagram,
  operation: Operations,
  expectedOutput: Diagram
): void {
  const simulatedOutput = getOperationFn(operation)(diagram);
  expect(cold(simulatedOutput.diagram, simulatedOutput.values)).toBeObservable(
    cold(expectedOutput.diagram, expectedOutput.values)
  );
}
