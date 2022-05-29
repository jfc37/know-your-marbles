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
  startWith,
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
  StartWith = 'start with',
  SwitchMap = 'switch map',
  TakeUntil = 'take until',
}

export enum OperatorArgument {
  None,
  Value,
}

export const OPERATOR_ARGUMENT_MAP = {
  [Operators.ConcatWith]: OperatorArgument.None,
  [Operators.First]: OperatorArgument.None,
  [Operators.Max]: OperatorArgument.None,
  [Operators.Merge]: OperatorArgument.None,
  [Operators.Min]: OperatorArgument.None,
  [Operators.StartWith]: OperatorArgument.Value,
  [Operators.SwitchMap]: OperatorArgument.None,
  [Operators.TakeUntil]: OperatorArgument.None,
};

export const DEFAULT_OPERATOR_ARGUMENT_MAP = {
  [Operators.ConcatWith]: undefined,
  [Operators.First]: undefined,
  [Operators.Max]: undefined,
  [Operators.Merge]: undefined,
  [Operators.Min]: undefined,
  [Operators.StartWith]: '2',
  [Operators.SwitchMap]: undefined,
  [Operators.TakeUntil]: undefined,
};

const OPERATOR_FN_MAP = {
  [Operators.ConcatWith]: (obs$: Observable<any>, argument: string) =>
    concatWith(obs$),
  [Operators.First]: (obs$: Observable<any>, argument: string) => first(),
  [Operators.Max]: (obs$: Observable<any>, argument: string) => max(),
  [Operators.Merge]: (obs$: Observable<any>, argument: string) =>
    mergeWith(obs$),
  [Operators.Min]: (obs$: Observable<any>, argument: string) => min(),
  [Operators.StartWith]: (obs$: Observable<any>, argument: string) =>
    startWith(argument),
  [Operators.SwitchMap]: (obs$: Observable<any>, argument: string) =>
    switchMap(() => obs$),
  [Operators.TakeUntil]: (obs$: Observable<any>, argument: string) =>
    takeUntil(obs$),
};

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
