import {
  createEmptyMarble,
  createTerminalMarble,
  MarbleDiagram,
  MarbleValue,
  Operations,
} from './types';

const OPERATION_CALC_MAP = {
  [Operations.First]: firstCalculation,
  [Operations.Max]: maxCalculation,
  [Operations.Merge]: mergeCalculation,
  [Operations.Min]: minCalculation,
  [Operations.TakeUntil]: takeUntilCalculation,
};

export function getCalculationFn(
  operator: Operations
): (...inputs: MarbleDiagram[]) => MarbleDiagram {
  return OPERATION_CALC_MAP[operator];
}

export function mergeCalculation(
  primaryInput: MarbleDiagram,
  secondaryInput: MarbleDiagram
): MarbleDiagram {
  return primaryInput;
}

export function takeUntilCalculation(
  primaryInput: MarbleDiagram,
  secondaryInput: MarbleDiagram
): MarbleDiagram {
  return primaryInput;
}

export function firstCalculation(input: MarbleDiagram): MarbleDiagram {
  return input;
}

export function maxCalculation(input: MarbleDiagram): MarbleDiagram {
  return input;
}

export function minCalculation(input: MarbleDiagram): MarbleDiagram {
  return input;
}
