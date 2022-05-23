import { Diagram } from '../diagram';
import { marblesToDiagram } from '../marble.utils';
import { getFirstEmissionTick } from './utils';

export function takeUntil(
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
