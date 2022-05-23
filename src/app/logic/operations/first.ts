import { Diagram } from '../diagram';
import { getFirstEmissionTick } from './utils';

export function first(input: Diagram): Diagram {
  const marbles = input.toMarbles();

  if (input.hasNoEmittedValues) {
    return Diagram.createWithBlankTicks(marbles.length);
  }

  const firstEmissionTick = getFirstEmissionTick(marbles);
  return Diagram.createWithBlankTicks(firstEmissionTick).prepend(
    Diagram.create('(a|)', { a: input.values['a'] })
  );
}
