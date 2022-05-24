import { Diagram } from '../diagram';
import { getCompletionTick, getFirstEmissionTick } from './utils';

export function first(input: Diagram): Diagram {
  const marbles = input.toMarbles();

  if (input.completes && input.hasNoEmittedValues) {
    const completionTick = getCompletionTick(marbles);

    return Diagram.createWithBlankTicks(completionTick).prepend('#');
  }

  if (input.hasNoEmittedValues) {
    return Diagram.createWithBlankTicks(marbles.length);
  }

  const firstEmissionTick = getFirstEmissionTick(marbles);
  return Diagram.createWithBlankTicks(firstEmissionTick).prepend(
    Diagram.create('(a|)', { a: input.values['a'] })
  );
}
