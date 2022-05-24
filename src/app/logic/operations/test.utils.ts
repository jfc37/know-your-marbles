import { cold } from 'jasmine-marbles';
import {
  MonoTypeOperatorFunction,
  ObservableInput,
  OperatorFunction,
} from 'rxjs';
import { Diagram } from '../diagram';
import { getOperationFn, Operations } from '../operation-map';

export function compareWithRxjs<TInput, TOutput>(
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

export function binaryCompareWithRxjs<TOutput>(
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

export function compareWithExpected(
  diagram: Diagram,
  operation: Operations,
  expectedOutput: Diagram
): void {
  const simulatedOutput = getOperationFn(operation)(diagram);
  expect(cold(simulatedOutput.diagram, simulatedOutput.values)).toBeObservable(
    cold(expectedOutput.diagram, expectedOutput.values)
  );
}
