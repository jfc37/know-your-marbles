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
  filter,
  map,
  combineLatestWith,
  raceWith,
} from 'rxjs/operators';
import { TestScheduler } from 'rxjs/testing';
import { Diagram } from './diagram';
import { messagesToDiagram } from './marble.utils';

export interface Pipe {
  operation: Operators;
  diagram?: Diagram;
  argument?: string;
}

export enum Operators {
  CombineLatestWith = 'combine latest with',
  ConcatWith = 'concat with',
  Filter = 'filter',
  First = 'first',
  Map = 'map',
  Max = 'max',
  Merge = 'merge',
  Min = 'min',
  RaceWith = 'race with',
  StartWith = 'start with',
  SwitchMap = 'switch map',
  TakeUntil = 'take until',
}

export enum OperatorArgument {
  None,
  Evaluation,
  Projection,
  Value,
}

export const OPERATOR_ARGUMENT_MAP = {
  [Operators.CombineLatestWith]: OperatorArgument.None,
  [Operators.ConcatWith]: OperatorArgument.None,
  [Operators.Filter]: OperatorArgument.Evaluation,
  [Operators.First]: OperatorArgument.None,
  [Operators.Map]: OperatorArgument.Projection,
  [Operators.Max]: OperatorArgument.None,
  [Operators.Merge]: OperatorArgument.None,
  [Operators.Min]: OperatorArgument.None,
  [Operators.RaceWith]: OperatorArgument.None,
  [Operators.StartWith]: OperatorArgument.Value,
  [Operators.SwitchMap]: OperatorArgument.None,
  [Operators.TakeUntil]: OperatorArgument.None,
};

export const DEFAULT_OPERATOR_ARGUMENT_MAP = {
  [Operators.CombineLatestWith]: undefined,
  [Operators.ConcatWith]: undefined,
  [Operators.Filter]: 'x > 5',
  [Operators.First]: undefined,
  [Operators.Map]: 'x + 1',
  [Operators.Max]: undefined,
  [Operators.Merge]: undefined,
  [Operators.Min]: undefined,
  [Operators.RaceWith]: undefined,
  [Operators.StartWith]: '2',
  [Operators.SwitchMap]: undefined,
  [Operators.TakeUntil]: undefined,
};

const OPERATOR_FN_MAP = {
  [Operators.CombineLatestWith]: (obs$: Observable<any>, argument: string) =>
    combineLatestWith(obs$),
  [Operators.ConcatWith]: (obs$: Observable<any>, argument: string) =>
    concatWith(obs$),
  [Operators.Filter]: (obs$: Observable<any>, argument: string) =>
    filter<any>(argumentToFn(argument)),
  [Operators.First]: (obs$: Observable<any>, argument: string) => first(),
  [Operators.Map]: (obs$: Observable<any>, argument: string) =>
    map(argumentToFn(argument)),
  [Operators.Max]: (obs$: Observable<any>, argument: string) => max(),
  [Operators.Merge]: (obs$: Observable<any>, argument: string) =>
    mergeWith(obs$),
  [Operators.Min]: (obs$: Observable<any>, argument: string) => min(),
  [Operators.RaceWith]: (obs$: Observable<any>, argument: string) =>
    raceWith(obs$),
  [Operators.StartWith]: (obs$: Observable<any>, argument: string) =>
    startWith(argument),
  [Operators.SwitchMap]: (obs$: Observable<any>, argument: string) =>
    switchMap(() => obs$),
  [Operators.TakeUntil]: (obs$: Observable<any>, argument: string) =>
    takeUntil(obs$),
};

function argumentToFn(argument: string): () => boolean {
  return Function('x', 'y', 'return ' + argument) as () => boolean;
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
