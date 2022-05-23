import { Diagram } from '../diagram';
import { getCompletionTick, neverCompletes } from './utils';

export function min(input: Diagram): Diagram {
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

function orderDescending(a: number, b: number) {
  return a < b ? -1 : 1;
}
