import {
  createEmptyMarble,
  createTerminalMarble,
  doesMarbleContainCompletion,
  isBlankMarble,
  isCompletionWithNoEmitMarble,
  isSingleEmitMarble,
  MarbleDiagram,
  MarbleValue,
} from './types';

enum MarbleSymbol {
  Blank = '-',
  Completion = '|',
  Group = '(',
}

export function diagramToMarbles(diagram: MarbleDiagram): MarbleValue[] {
  const marbles: MarbleValue[] = [];
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
): { marble: MarbleValue; nextTickIndex: number } {
  const startOfTick = diagram.diagram[index];
  if (startOfTick == MarbleSymbol.Blank) {
    return {
      marble: createEmptyMarble(),
      nextTickIndex: index + 1,
    };
  } else if (startOfTick == MarbleSymbol.Completion) {
    return {
      marble: createTerminalMarble(),
      nextTickIndex: index + 1,
    };
  } else if (startOfTick == MarbleSymbol.Group) {
    const openingIndex = index;
    const closingIndex = diagram.diagram.indexOf(')', index);
    diagram.diagram.substring(openingIndex + 1, closingIndex);
    const values = diagram.diagram.substring(openingIndex + 1, closingIndex);
    return {
      marble: {
        terminal: values.includes('|'),
        values: [diagram.values[values[0]], diagram.values[values[1]]].filter(
          Boolean
        ),
      },
      nextTickIndex: closingIndex + 1,
    };
  } else {
    return {
      marble: {
        terminal: false,
        values: [diagram.values[diagram.diagram[index]]].filter(Boolean),
      },
      nextTickIndex: index + 1,
    };
  }
}

export function marblesToDiagram(marbles: MarbleValue[]): MarbleDiagram {
  const keys = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];
  let keyIndex = 0;
  const marbleDiagram: MarbleDiagram = {
    diagram: '',
    values: {},
  };

  marbles.forEach((marble) => {
    if (isBlankMarble(marble)) {
      marbleDiagram.diagram = marbleDiagram.diagram + '-';
    } else if (isCompletionWithNoEmitMarble(marble)) {
      marbleDiagram.diagram = marbleDiagram.diagram + '|';
    } else if (isSingleEmitMarble(marble)) {
      marbleDiagram.diagram = marbleDiagram.diagram + keys[keyIndex];
      marbleDiagram.values[keys[keyIndex]] = marble.values[0];
      keyIndex++;
    } else {
      marbleDiagram.diagram = marbleDiagram.diagram + '(';
      marbleDiagram.diagram = marbleDiagram.diagram + keys[keyIndex];
      marbleDiagram.values[keys[keyIndex]] = marble.values[0];
      keyIndex++;

      if (marble.values[1] != null) {
        marbleDiagram.diagram = marbleDiagram.diagram + keys[keyIndex];
        marbleDiagram.values[keys[keyIndex]] = marble.values[1];
        keyIndex++;
      }

      if (doesMarbleContainCompletion(marble)) {
        marbleDiagram.diagram = marbleDiagram.diagram + '|';
      }

      marbleDiagram.diagram = marbleDiagram.diagram + ')';
    }
  });

  return marbleDiagram;
}
