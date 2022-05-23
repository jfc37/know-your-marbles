import { MarbleDiagram, Marble } from './types';

enum MarbleSymbol {
  Blank = '-',
  Completion = '|',
  Group = '(',
}

export function diagramToMarbles(diagram: MarbleDiagram): Marble[] {
  const marbles: Marble[] = [];
  let index = 0;
  while (index < diagram.diagram.length) {
    const result = currentTickToMarble(diagram, index);
    marbles.push(result.marble);
    index = result.nextTickIndex;
  }

  return marbles;
}

function currentTickToMarble(
  diagram: MarbleDiagram,
  index: number
): { marble: Marble; nextTickIndex: number } {
  const startOfTick = diagram.diagram[index];
  if (startOfTick == MarbleSymbol.Blank) {
    return {
      marble: Marble.createEmpty(),
      nextTickIndex: index + 1,
    };
  } else if (startOfTick == MarbleSymbol.Completion) {
    return {
      marble: Marble.createCompletion(),
      nextTickIndex: index + 1,
    };
  } else if (startOfTick == MarbleSymbol.Group) {
    const openingIndex = index;
    const closingIndex = diagram.diagram.indexOf(')', index);
    diagram.diagram.substring(openingIndex + 1, closingIndex);
    const values = diagram.diagram.substring(openingIndex + 1, closingIndex);
    return {
      marble: Marble.create(
        [diagram.values[values[0]], diagram.values[values[1]]],
        values.includes('|')
      ),
      nextTickIndex: closingIndex + 1,
    };
  } else {
    return {
      marble: Marble.create([diagram.values[diagram.diagram[index]]]),
      nextTickIndex: index + 1,
    };
  }
}

export function marblesToDiagram(marbles: Marble[]): MarbleDiagram {
  let keyIndex = 0;

  return marbles.reduce(
    (fullDiagram, marble) => {
      const result = marble.toDiagram(keyIndex);
      keyIndex = result.keyIndex;
      return {
        diagram: fullDiagram.diagram + result.diagram,
        values: { ...fullDiagram.values, ...result.values },
      } as MarbleDiagram;
    },
    { diagram: '', values: {} } as MarbleDiagram
  );
}
