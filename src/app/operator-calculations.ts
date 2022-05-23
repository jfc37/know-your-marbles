import { marblesToDiagram } from './conversions';
import { Diagram, Marble, Operations } from './types';

const OPERATION_CALC_MAP = {
  [Operations.First]: firstCalculation,
  [Operations.Max]: maxCalculation,
  [Operations.Merge]: mergeCalculation,
  [Operations.Min]: minCalculation,
  [Operations.TakeUntil]: takeUntilCalculation,
};

export function getCalculationFn(
  operator: Operations
): (...inputs: Diagram[]) => Diagram {
  return OPERATION_CALC_MAP[operator];
}

export function mergeCalculation(
  primaryInput: Diagram,
  secondaryInput: Diagram
): Diagram {
  return primaryInput;
}

export function takeUntilCalculation(
  primaryInput: Diagram,
  secondaryInput: Diagram
): Diagram {
  if (secondaryInput.hasNoEmittedValues) {
    return primaryInput;
  }

  const secondaryMarbles = secondaryInput.toMarbles();
  const firstEmission = getFirstEmissionTick(secondaryMarbles);

  const primaryMarbles = primaryInput.toMarbles();
  const truncatedPrimaryMarbles = primaryMarbles.slice(0, firstEmission);
  const truncatedPrimaryDiagram = marblesToDiagram(truncatedPrimaryMarbles);
  return Diagram.create(
    truncatedPrimaryDiagram.diagram + '|',
    truncatedPrimaryDiagram.values
  );
}

export function firstCalculation(input: Diagram): Diagram {
  const marbles = input.toMarbles();

  if (input.hasNoEmittedValues) {
    return Diagram.createWithBlankTicks(marbles.length);
  }

  const firstEmissionTick = getFirstEmissionTick(marbles);
  return Diagram.createWithBlankTicks(firstEmissionTick).prepend(
    Diagram.create('(a|)', { a: input.values['a'] })
  );
}

export function maxCalculation(input: Diagram): Diagram {
  const marbles = input.toMarbles();

  if (neverCompletes(marbles)) {
    return Diagram.createWithBlankTicks(marbles.length);
  }
  const completionTick = getCompletionTick(marbles);

  if (input.hasNoEmittedValues) {
    return Diagram.createWithBlankTicks(completionTick).prepend('|');
  }

  const max = input.emittedValues.sort(orderAscending)[0];

  return Diagram.createWithBlankTicks(completionTick).prepend(
    Diagram.create('(a|)', { a: max })
  );
}

export function minCalculation(input: Diagram): Diagram {
  const marbles = input.toMarbles();

  if (neverCompletes(marbles)) {
    return Diagram.createWithBlankTicks(marbles.length);
  }
  const completionTick = getCompletionTick(marbles);

  if (input.hasNoEmittedValues) {
    return Diagram.createWithBlankTicks(completionTick).prepend('|');
  }

  const min = input.emittedValues.sort(orderDescending)[0];

  return Diagram.createWithBlankTicks(completionTick).prepend(
    Diagram.create('(a|)', { a: min })
  );
}

function neverCompletes(marbles: Marble[]): boolean {
  return !marbles.some((marble) => marble.completion);
}

function getFirstEmissionTick(marbles: Marble[]): number {
  const first = marbles.find((marble) => marble.values.length > 0);
  return marbles.indexOf(first!);
}

function getCompletionTick(marbles: Marble[]): number {
  const completion = marbles.find((marble) => marble.completion);
  return marbles.indexOf(completion!);
}

function orderAscending(a: number, b: number) {
  return a > b ? -1 : 1;
}

function orderDescending(a: number, b: number) {
  return a < b ? -1 : 1;
}
