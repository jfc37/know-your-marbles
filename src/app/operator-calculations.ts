import { diagramToMarbles, marblesToDiagram } from './conversions';
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
  if (neverEmits(secondaryInput)) {
    return primaryInput;
  }

  const secondaryMarbles = diagramToMarbles(secondaryInput);
  const firstEmission = getFirstEmissionTick(secondaryMarbles);

  const primaryMarbles = diagramToMarbles(primaryInput);
  const truncatedPrimaryMarbles = primaryMarbles.slice(0, firstEmission);
  const truncatedPrimaryDiagram = marblesToDiagram(truncatedPrimaryMarbles);
  return Diagram.create(
    truncatedPrimaryDiagram.diagram + '|',
    truncatedPrimaryDiagram.values
  );
}

export function firstCalculation(input: Diagram): Diagram {
  const marbles = diagramToMarbles(input);

  if (neverEmits(input)) {
    return Diagram.createWithBlankTicks(marbles.length);
  }

  const firstEmissionTick = getFirstEmissionTick(marbles);
  return Diagram.createWithBlankTicks(firstEmissionTick).prepend(
    Diagram.create('(a|)', { a: input.values['a'] })
  );
}

export function maxCalculation(input: Diagram): Diagram {
  const marbles = diagramToMarbles(input);

  if (neverCompletes(marbles)) {
    return Diagram.createWithBlankTicks(marbles.length);
  }
  const completionTick = getCompletionTick(marbles);

  if (neverEmits(input)) {
    return Diagram.createWithBlankTicks(completionTick).prepend('|');
  }

  const max = getEmittedValues(input).sort(orderAscending)[0];

  return Diagram.createWithBlankTicks(completionTick).prepend(
    Diagram.create('(a|)', { a: max })
  );
}

export function minCalculation(input: Diagram): Diagram {
  const marbles = diagramToMarbles(input);

  if (neverCompletes(marbles)) {
    return Diagram.createWithBlankTicks(marbles.length);
  }
  const completionTick = getCompletionTick(marbles);

  if (neverEmits(input)) {
    return Diagram.createWithBlankTicks(completionTick).prepend('|');
  }

  const min = getEmittedValues(input).sort(orderDescending)[0];

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

function getEmittedValues(marbleDiagram: Diagram): number[] {
  return [...Object.values(marbleDiagram.values)];
}

function neverEmits(marbleDiagram: Diagram): boolean {
  return Object.values(marbleDiagram.values).length === 0;
}

function orderAscending(a: number, b: number) {
  return a > b ? -1 : 1;
}

function orderDescending(a: number, b: number) {
  return a < b ? -1 : 1;
}
