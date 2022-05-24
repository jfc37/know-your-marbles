import { concat, Observable } from 'rxjs';
import { TestMessage } from 'rxjs/internal/testing/TestMessage';
import { first, map, max, takeUntil, mergeWith, min } from 'rxjs/operators';
import { TestScheduler } from 'rxjs/testing';
import { Diagram } from './diagram';
import { messagesToDiagram } from './marble.utils';

export enum Operations {
  First = 'first',
  Max = 'max',
  Merge = 'merge',
  Min = 'min',
  TakeUntil = 'take until',
}

const OPERATION_CALC_MAP = {
  [Operations.First]: (obs$: Observable<any>) => first(),
  [Operations.Max]: (obs$: Observable<any>) => max(),
  [Operations.Merge]: (obs$: Observable<any>) => mergeWith(obs$),
  [Operations.Min]: (obs$: Observable<any>) => min(),
  [Operations.TakeUntil]: (obs$: Observable<any>) => takeUntil(obs$),
};

export function invokeOperator(
  operator: Operations,
  input: Diagram,
  secondaryInput?: Diagram
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
    const rxjsOperator = OPERATION_CALC_MAP[operator](secondaryInput$!);
    const output$ = input$.pipe(rxjsOperator);
    expectObservable(output$).toBe('');
  });

  return diagram;
}
