import { Diagram, Marble } from './types';

export function diagramToMarbles(diagram: Diagram): Marble[] {
  return diagram.toMarbles();
}

export function marblesToDiagram(marbles: Marble[]): Diagram {
  let keyIndex = 0;

  return marbles.reduce((fullDiagram, marble) => {
    const result = marble.toDiagram(keyIndex);
    keyIndex = result.keyIndex;
    return Diagram.create(fullDiagram.diagram + result.diagram, {
      ...fullDiagram.values,
      ...result.values,
    });
  }, Diagram.create(''));
}
