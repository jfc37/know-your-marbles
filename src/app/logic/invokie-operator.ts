import { TestMessage } from 'rxjs/internal/testing/TestMessage';
import { TestScheduler } from 'rxjs/testing';
import { Diagram } from './diagram';
import { messagesToDiagram } from './marble.utils';
import { Operators, OPERATOR_FN_MAP } from './operators';

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
