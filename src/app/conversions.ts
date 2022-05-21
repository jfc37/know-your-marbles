import { createEmptyMarble, MarbleDiagram, MarbleValue } from './types';

export function diagramToMarbles(diagram: MarbleDiagram): MarbleValue[] {
  const marbles: MarbleValue[] = [];
  let index = 0;
  index; /*?*/
  while (index < diagram.diagram.length) {
    if (diagram.diagram[index] === '-') {
      marbles.push(createEmptyMarble());
      index++;
    } else if (diagram.diagram[index] === '(') {
      index++;
      // const marbleForCurrentTick = createEmptyMarble();
      while (diagram.diagram[index] != ')') {
        //   if (diagram.diagram[index] == '|') {
        //     marbleForCurrentTick.terminal = true;
        //   } else if (marbleForCurrentTick.value == null) {
        //     marbleForCurrentTick.value = diagram.values[diagram.diagram[index]];
        //   } else {
        //     marbleForCurrentTick.secondaryValue =
        //       diagram.values[diagram.diagram[index]];
        //   }
        index++;
      }
    }
  }

  return marbles;
}

export function marblesToDiagram(marbles: MarbleValue[]): MarbleDiagram {
  return { diagram: marbles.map((x) => '-').join(''), values: {} };
}

const diagram: MarbleDiagram = {
  diagram: '(|)',
  values: { a: 1, b: 2 },
};
diagramToMarbles(diagram); /*?*/
