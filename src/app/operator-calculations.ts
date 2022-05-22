import { diagramToMarbles } from './conversions';
import { MarbleDiagram, MarbleValue, Operations } from './types';

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
  const marbles = diagramToMarbles(input);

  if (neverEmits(input)) {
    return getEmptyMarbleDiagram(marbles.length);
  }

  const firstEmissionTick = getFirstEmissionTick(marbles);
  return {
    diagram: getEmptyDiagram(firstEmissionTick) + '(a|)',
    values: { a: input.values['a'] },
  };
}

export function maxCalculation(input: MarbleDiagram): MarbleDiagram {
  const marbles = diagramToMarbles(input);

  if (neverCompletes(marbles)) {
    return getEmptyMarbleDiagram(marbles.length);
  }
  const completionTick = getCompletionTick(marbles);

  if (neverEmits(input)) {
    return {
      diagram: getEmptyDiagram(completionTick) + '|',
      values: {},
    };
  }

  const max = getEmittedValues(input).sort(orderAscending)[0];

  return {
    diagram: getEmptyDiagram(completionTick) + '(a|)',
    values: {
      a: max,
    },
  };
}

export function minCalculation(input: MarbleDiagram): MarbleDiagram {
  const marbles = diagramToMarbles(input);

  if (neverCompletes(marbles)) {
    return getEmptyMarbleDiagram(marbles.length);
  }
  const completionTick = getCompletionTick(marbles);

  if (neverEmits(input)) {
    return {
      diagram: getEmptyDiagram(completionTick) + '|',
      values: {},
    };
  }

  const min = getEmittedValues(input).sort(orderDescending)[0];

  return {
    diagram: getEmptyDiagram(completionTick) + '(a|)',
    values: {
      a: min,
    },
  };
}

function neverCompletes(marbles: MarbleValue[]): boolean {
  return !marbles.some((marble) => marble.terminal);
}

function getEmptyMarbleDiagram(ticks: number): MarbleDiagram {
  return { diagram: getEmptyDiagram(ticks), values: {} };
}

function getEmptyDiagram(ticks: number): string {
  return [...Array(ticks)].map((_) => '-').join('');
}

function getFirstEmissionTick(marbles: MarbleValue[]): number {
  const first = marbles.find((marble) => marble.value);
  return marbles.indexOf(first!);
}

function getCompletionTick(marbles: MarbleValue[]): number {
  const completion = marbles.find((marble) => marble.terminal);
  return marbles.indexOf(completion!);
}

function getEmittedValues(marbleDiagram: MarbleDiagram): number[] {
  return [...Object.values(marbleDiagram.values)];
}

function neverEmits(marbleDiagram: MarbleDiagram): boolean {
  return Object.values(marbleDiagram.values).length === 0;
}

function orderAscending(a: number, b: number) {
  return a > b ? -1 : 1;
}

function orderDescending(a: number, b: number) {
  return a < b ? -1 : 1;
}
