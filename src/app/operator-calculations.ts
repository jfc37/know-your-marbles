import { diagramToMarbles } from './conversions';
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
  const marbles = diagramToMarbles(input);
  const completion = marbles.find((marble) => marble.terminal);

  if (!completion) {
    return { diagram: marbles.map((_) => '-').join(''), values: {} };
  }

  const min = Object.values(input.values).sort((a, b) => (a < b ? -1 : 1))[0];
  const completionTick = marbles.indexOf(completion);
  return {
    diagram: [[...Array(completionTick)].map((_) => '-').join(''), '(a|)'].join(
      ''
    ),
    values: {
      a: min,
    },
  };
}
