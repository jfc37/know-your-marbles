import { TestMessage } from 'rxjs/internal/testing/TestMessage';
import { TestScheduler } from 'rxjs/testing';
import { Diagram } from './diagram';
import { messagesToDiagram } from './marble.utils';
import {
  DEFAULT_OPERATOR_ARGUMENT_MAP,
  OperatorArgument,
  Operators,
  OPERATOR_ARGUMENT_MAP,
  OPERATOR_FN_MAP,
} from './operators';

export function getDefaultArgumentForOperator(operator: Operators): string {
  return DEFAULT_OPERATOR_ARGUMENT_MAP[operator] || undefined;
}

export function getArgumentTypeForOperator(
  operator: Operators
): OperatorArgument {
  return OPERATOR_ARGUMENT_MAP[operator] || OperatorArgument.None;
}

export function invokeOperator(
  operator: Operators,
  input: Diagram,
  secondaryInput?: Diagram,
  argument?: string
): Diagram {
  let diagram = Diagram.create('');

  const scheduler = new TestScheduler((messages: TestMessage[]) => {
    diagram = messagesToDiagram(messages);
  });

  scheduler.run((helpers) => {
    const { cold, expectObservable } = helpers;
    const input$ = cold(input.diagram, input.values);
    const secondaryInput$ =
      secondaryInput && cold(secondaryInput.diagram, secondaryInput.values);
    const rxjsOperator = OPERATOR_FN_MAP[operator](secondaryInput$!, argument!);
    const output$ = input$.pipe(rxjsOperator);
    expectObservable(output$).toBe('');
  });

  return diagram;
}
