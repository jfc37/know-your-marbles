import { Observable } from 'rxjs';
import { TestMessage } from 'rxjs/internal/testing/TestMessage';
import {
  first,
  concatWith,
  max,
  takeUntil,
  mergeWith,
  min,
  switchMap,
} from 'rxjs/operators';
import { TestScheduler } from 'rxjs/testing';
import { Diagram } from './diagram';
import { messagesToDiagram } from './marble.utils';

export enum Operators {
  ConcatWith = 'concat with',
  First = 'first',
  Max = 'max',
  Merge = 'merge',
  Min = 'min',
  SwitchMap = 'switch map',
  TakeUntil = 'take until',
}

const OPERATOR_FN_MAP = {
  [Operators.ConcatWith]: (obs$: Observable<any>) => concatWith(obs$),
  [Operators.First]: (obs$: Observable<any>) => first(),
  [Operators.Max]: (obs$: Observable<any>) => max(),
  [Operators.Merge]: (obs$: Observable<any>) => mergeWith(obs$),
  [Operators.Min]: (obs$: Observable<any>) => min(),
  [Operators.SwitchMap]: (obs$: Observable<any>) => switchMap(() => obs$),
  [Operators.TakeUntil]: (obs$: Observable<any>) => takeUntil(obs$),
};

export function invokeOperator(
  operator: Operators,
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
    const rxjsOperator = OPERATOR_FN_MAP[operator](secondaryInput$!);
    const output$ = input$.pipe(rxjsOperator);
    expectObservable(output$).toBe('');
  });

  return diagram;
}
