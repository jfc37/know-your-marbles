import { Diagram } from './diagram';
import { first } from './operations/first';
import { max } from './operations/max';
import { merge } from './operations/merge';
import { min } from './operations/min';
import { takeUntil } from './operations/takeUntil';

export enum Operations {
  First = 'first',
  Max = 'max',
  Merge = 'merge',
  Min = 'min',
  TakeUntil = 'take until',
}

const OPERATION_CALC_MAP = {
  [Operations.First]: first,
  [Operations.Max]: max,
  [Operations.Merge]: merge,
  [Operations.Min]: min,
  [Operations.TakeUntil]: takeUntil,
};

export function getOperationFn(
  operator: Operations
): (...inputs: Diagram[]) => Diagram {
  return OPERATION_CALC_MAP[operator];
}
