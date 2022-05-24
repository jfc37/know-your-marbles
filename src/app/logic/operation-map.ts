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

export enum Operations {
  ConcatWith = 'concat with',
  First = 'first',
  Max = 'max',
  Merge = 'merge',
  Min = 'min',
  SwitchMap = 'switch map',
  TakeUntil = 'take until',
}

const OPERATION_CALC_MAP = {
  [Operations.ConcatWith]: (obs$: Observable<any>) => concatWith(obs$),
  [Operations.First]: (obs$: Observable<any>) => first(),
  [Operations.Max]: (obs$: Observable<any>) => max(),
  [Operations.Merge]: (obs$: Observable<any>) => mergeWith(obs$),
  [Operations.Min]: (obs$: Observable<any>) => min(),
  [Operations.SwitchMap]: (obs$: Observable<any>) => switchMap(() => obs$),
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
