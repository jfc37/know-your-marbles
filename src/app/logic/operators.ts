import { Observable } from 'rxjs';
import {
  auditTime,
  buffer,
  catchError,
  combineLatestWith,
  concatWith,
  debounceTime,
  delay,
  distinct,
  distinctUntilChanged,
  endWith,
  filter,
  first,
  last,
  map,
  max,
  mergeWith,
  min,
  pairwise,
  raceWith,
  repeat,
  retry,
  startWith,
  switchMap,
  takeUntil,
  throttle,
  throttleTime,
  throwIfEmpty,
  withLatestFrom,
} from 'rxjs/operators';
import { Diagram } from './diagram';

export interface Pipe {
  operation: Operators;
  diagram?: Diagram;
  argument?: string;
}

export enum Operators {
  AuditTime = 'audit time',
  Buffer = 'buffer',
  CatchError = 'catch error',
  CombineLatestWith = 'combine latest with',
  ConcatWith = 'concat with',
  DebounceTime = 'debounce time',
  Delay = 'delay',
  Distinct = 'distinct',
  DistinctUntilChanged = 'distinct until changed',
  EndWith = 'end with',
  Filter = 'filter',
  First = 'first',
  Last = 'last',
  Map = 'map',
  Max = 'max',
  MergeWith = 'merge with',
  Min = 'min',
  Pairwise = 'pairwise',
  RaceWith = 'race with',
  Repeat = 'repeat',
  Retry = 'retry',
  StartWith = 'start with',
  SwitchMap = 'switch map',
  TakeUntil = 'take until',
  ThrottleTime = 'throttle time',
  ThrowIfEmpty = 'throw if empty',
  WithLatestFrom = 'with latest from',
}

export enum OperatorArgument {
  None,
  Evaluation,
  Projection,
  Value,
}

export const OPERATOR_ARGUMENT_MAP: any = {
  [Operators.AuditTime]: OperatorArgument.Value,
  [Operators.DebounceTime]: OperatorArgument.Value,
  [Operators.Delay]: OperatorArgument.Value,
  [Operators.EndWith]: OperatorArgument.Value,
  [Operators.Filter]: OperatorArgument.Evaluation,
  [Operators.Map]: OperatorArgument.Projection,
  [Operators.Repeat]: OperatorArgument.Value,
  [Operators.Retry]: OperatorArgument.Value,
  [Operators.StartWith]: OperatorArgument.Value,
  [Operators.ThrottleTime]: OperatorArgument.Value,
};

export const DEFAULT_OPERATOR_ARGUMENT_MAP: any = {
  [Operators.AuditTime]: '2',
  [Operators.DebounceTime]: '1',
  [Operators.Delay]: '1',
  [Operators.EndWith]: '1',
  [Operators.Filter]: 'x > 5',
  [Operators.Map]: 'x + 1',
  [Operators.Repeat]: '1',
  [Operators.Retry]: '3',
  [Operators.StartWith]: '2',
  [Operators.ThrottleTime]: '3',
};

export const OPERATOR_FN_MAP = {
  [Operators.AuditTime]: (obs$: Observable<any>, argument: string) =>
    auditTime(Number(argument)),
  [Operators.Buffer]: (obs$: Observable<any>, argument: string) => buffer(obs$),
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
  [Operators.EndWith]: (obs$: Observable<any>, argument: string) =>
    endWith(Number(argument)),
  [Operators.Filter]: (obs$: Observable<any>, argument: string) =>
    filter<any>(argumentToFn(argument)),
  [Operators.First]: (obs$: Observable<any>, argument: string) => first(),
  [Operators.Last]: (obs$: Observable<any>, argument: string) => last(),
  [Operators.Map]: (obs$: Observable<any>, argument: string) =>
    map(argumentToFn(argument)),
  [Operators.Max]: (obs$: Observable<any>, argument: string) => max(),
  [Operators.MergeWith]: (obs$: Observable<any>, argument: string) =>
    mergeWith(obs$),
  [Operators.Min]: (obs$: Observable<any>, argument: string) => min(),
  [Operators.Pairwise]: (obs$: Observable<any>, argument: string) => pairwise(),
  [Operators.RaceWith]: (obs$: Observable<any>, argument: string) =>
    raceWith(obs$),
  [Operators.Repeat]: (obs$: Observable<any>, argument: string) =>
    repeat(Number(argument)),
  [Operators.Retry]: (obs$: Observable<any>, argument: string) =>
    retry(Number(argument)),
  [Operators.StartWith]: (obs$: Observable<any>, argument: string) =>
    startWith(argument),
  [Operators.SwitchMap]: (obs$: Observable<any>, argument: string) =>
    switchMap(() => obs$),
  [Operators.TakeUntil]: (obs$: Observable<any>, argument: string) =>
    takeUntil(obs$),
  [Operators.ThrottleTime]: (obs$: Observable<any>, argument: string) =>
    throttleTime(Number(argument)),
  [Operators.ThrowIfEmpty]: (obs$: Observable<any>, argument: string) =>
    throwIfEmpty(),
  [Operators.WithLatestFrom]: (obs$: Observable<any>, argument: string) =>
    withLatestFrom(obs$),
};

function argumentToFn(argument: string): () => boolean {
  return Function('x', 'y', 'return ' + argument) as () => boolean;
}
