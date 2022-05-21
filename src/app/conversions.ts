import { createEmptyMarble, MarbleDiagram, MarbleValue } from './types';

export function diagramToMarbles(diagram: MarbleDiagram): MarbleValue[] {
  const marbles: MarbleValue[] = [];
  let index = 0;
  while (index < diagram.diagram.length) {
    if (diagram.diagram[index] === '-') {
      marbles.push(createEmptyMarble());
      index++;
    } else if (diagram.diagram[index] === '(') {
      index++;
      const marbleForCurrentTick = createEmptyMarble();
      marbles.push(marbleForCurrentTick);
      while (diagram.diagram[index] != ')') {
        if (diagram.diagram[index] == '|') {
          marbleForCurrentTick.terminal = true;
        } else if (marbleForCurrentTick.value == null) {
          marbleForCurrentTick.value = diagram.values[diagram.diagram[index]];
        } else {
          marbleForCurrentTick.secondaryValue =
            diagram.values[diagram.diagram[index]];
        }
        index++;
      }
      index++;
    } else {
      console.error(
        'unexpected value in diagram',
        diagram.diagram,
        index,
        diagram.diagram[index]
      );
      index++;
    }
  }

  return marbles;
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
    if (!marble.value) {
      if (!marble.terminal) {
        marbleDiagram.diagram = marbleDiagram.diagram + '-';
      } else {
        marbleDiagram.diagram = marbleDiagram.diagram + '(|)';
      }
    } else {
      marbleDiagram.diagram = marbleDiagram.diagram + '(';
      marbleDiagram.diagram = marbleDiagram.diagram + keys[keyIndex];
      marbleDiagram.values[keys[keyIndex]] = marble.value;
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
  });

  return marbleDiagram;
}
