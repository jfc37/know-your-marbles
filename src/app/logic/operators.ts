import { Observable, of } from 'rxjs';
import {
  catchError,
  combineLatestWith,
  concatWith,
  debounceTime,
  delay,
  distinct,
  distinctUntilChanged,
  filter,
  first,
  map,
  max,
  mergeWith,
  min,
  raceWith,
  startWith,
  switchMap,
  takeUntil,
  withLatestFrom,
} from 'rxjs/operators';
import { Diagram } from './diagram';

export interface Pipe {
  operation: Operators;
  diagram?: Diagram;
  argument?: string;
}

export enum Operators {
  CatchError = 'catch error',
  CombineLatestWith = 'combine latest with',
  ConcatWith = 'concat with',
  DebounceTime = 'debounce time',
  Delay = 'delay',
  Distinct = 'distinct',
  DistinctUntilChanged = 'distinct until changed',
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
  WithLatestFrom = 'with latest from',
}

export enum OperatorArgument {
  None,
  Evaluation,
  Projection,
  Value,
}

export const OPERATOR_ARGUMENT_MAP: any = {
  [Operators.DebounceTime]: OperatorArgument.Value,
  [Operators.Delay]: OperatorArgument.Value,
  [Operators.Filter]: OperatorArgument.Evaluation,
  [Operators.Map]: OperatorArgument.Projection,
  [Operators.StartWith]: OperatorArgument.Value,
};

export const DEFAULT_OPERATOR_ARGUMENT_MAP: any = {
  [Operators.DebounceTime]: '1',
  [Operators.Delay]: '1',
  [Operators.Filter]: 'x > 5',
  [Operators.Map]: 'x + 1',
  [Operators.StartWith]: '2',
};

export const OPERATOR_FN_MAP = {
  [Operators.CatchError]: (obs$: Observable<any>, argument: string) =>
    catchError(() => obs$),
  [Operators.CombineLatestWith]: (obs$: Observable<any>, argument: string) =>
    combineLatestWith(obs$),
  [Operators.ConcatWith]: (obs$: Observable<any>, argument: string) =>
    concatWith(obs$),
  [Operators.DebounceTime]: (obs$: Observable<any>, argument: string) =>
    debounceTime(Number(argument)),
  [Operators.Delay]: (obs$: Observable<any>, argument: string) =>
    delay(Number(argument)),
  [Operators.Distinct]: (obs$: Observable<any>, argument: string) => distinct(),
  [Operators.DistinctUntilChanged]: (obs$: Observable<any>, argument: string) =>
    distinctUntilChanged(),
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
  [Operators.WithLatestFrom]: (obs$: Observable<any>, argument: string) =>
    withLatestFrom(obs$),
};

function argumentToFn(argument: string): () => boolean {
  return Function('x', 'y', 'return ' + argument) as () => boolean;
}