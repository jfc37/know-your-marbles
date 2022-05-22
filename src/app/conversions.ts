import {
  createEmptyMarble,
  createTerminalMarble,
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
    const groupLength = closingIndex - openingIndex;
    const values = diagram.diagram.substring(openingIndex + 1, groupLength);
    return {
      marble: {
        terminal: values.includes('|'),
        value: diagram.values[values[0]],
        secondaryValue: diagram.values[values[1]],
      },
      nextTickIndex: closingIndex + 1,
    };
  } else {
    return {
      marble: {
        terminal: false,
        value: diagram.values[diagram.diagram[index]],
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
    if (!marble.value && !marble.terminal) {
      marbleDiagram.diagram = marbleDiagram.diagram + '-';
    } else if (!marble.value && marble.terminal) {
      marbleDiagram.diagram = marbleDiagram.diagram + '|';
    } else if (
      marble.value &&
      marble.secondaryValue == null &&
      !marble.terminal
    ) {
      marbleDiagram.diagram = marbleDiagram.diagram + keys[keyIndex];
      marbleDiagram.values[keys[keyIndex]] = marble.value;
      keyIndex++;
    } else {
      marbleDiagram.diagram = marbleDiagram.diagram + '(';
      marbleDiagram.diagram = marbleDiagram.diagram + keys[keyIndex];
      marbleDiagram.values[keys[keyIndex]] = marble.value!;
      keyIndex++;

      if (marble.secondaryValue != null) {
        marbleDiagram.diagram = marbleDiagram.diagram + keys[keyIndex];
        marbleDiagram.values[keys[keyIndex]] = marble.secondaryValue;
        keyIndex++;
      }

      if (marble.terminal) {
        marbleDiagram.diagram = marbleDiagram.diagram + '|';
      }

      marbleDiagram.diagram = marbleDiagram.diagram + ')';
    }

    // if (!marble.value) {
    //   if (!marble.terminal) {
    //     marbleDiagram.diagram = marbleDiagram.diagram + '-';
    //   } else {
    //     marbleDiagram.diagram = marbleDiagram.diagram + '(|)';
    //   }
    // } else {
    //   marbleDiagram.diagram = marbleDiagram.diagram + '(';
    //   marbleDiagram.diagram = marbleDiagram.diagram + keys[keyIndex];
    //   marbleDiagram.values[keys[keyIndex]] = marble.value;
    //   keyIndex++;

    //   if (marble.secondaryValue != null) {
    //     marbleDiagram.diagram = marbleDiagram.diagram + keys[keyIndex];
    //     marbleDiagram.values[keys[keyIndex]] = marble.secondaryValue;
    //     keyIndex++;
    //   }

    //   if (marble.terminal) {
    //     marbleDiagram.diagram = marbleDiagram.diagram + '|';
    //   }

    //   marbleDiagram.diagram = marbleDiagram.diagram + ')';
    // }
  });

  return marbleDiagram;
}
