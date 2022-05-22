import { diagramToMarbles, marblesToDiagram } from './conversions';
import {
  createEmptyMarble,
  createTerminalMarble,
  MarbleDiagram,
  MarbleValue,
} from './types';

describe('diagramToMarbles', () => {
  it('should map "-"', () => {
    const marbleDiagram: MarbleDiagram = {
      diagram: '-',
      values: {},
    };

    const marbles = diagramToMarbles(marbleDiagram);

    expect(marbles.length).toBe(1);
    expect(marbles[0].value).toBeNull();
    expect(marbles[0].terminal).toBeFalse();
  });

  it('should map "|"', () => {
    const marbleDiagram: MarbleDiagram = {
      diagram: '|',
      values: {},
    };

    const marbles = diagramToMarbles(marbleDiagram);

    expect(marbles.length).toBe(1);
    expect(marbles[0].value).toBeNull();
    expect(marbles[0].terminal).toBeTrue();
  });

  it('should map "a"', () => {
    const marbleDiagram: MarbleDiagram = {
      diagram: 'a',
      values: { a: 1 },
    };

    const marbles = diagramToMarbles(marbleDiagram);

    expect(marbles.length).toBe(1);
    expect(marbles[0].value).toBe(1);
    expect(marbles[0].terminal).toBeFalse();
  });

  it('should map (a|)', () => {
    const marbleDiagram: MarbleDiagram = {
      diagram: '(a|)',
      values: { a: 1 },
    };

    const marbles = diagramToMarbles(marbleDiagram);

    expect(marbles.length).toBe(1);
    expect(marbles[0].value).toBe(1);
    expect(marbles[0].terminal).toBeTrue();
  });

  fit('should map --(a|)', () => {
    const marbleDiagram: MarbleDiagram = {
      diagram: '--(a|)',
      values: { a: 1 },
    };

    const marbles = diagramToMarbles(marbleDiagram);

    expect(marbles.length).toBe(3);
    expect(marbles[2].value).toBe(1);
    expect(marbles[2].terminal).toBeTrue();
  });

  it('should map (ab)', () => {
    const marbleDiagram: MarbleDiagram = {
      diagram: '(ab)',
      values: { a: 1, b: 2 },
    };

    const marbles = diagramToMarbles(marbleDiagram);

    expect(marbles.length).toBe(1);
    expect(marbles[0].value).toBe(1);
    expect(marbles[0].secondaryValue).toBe(2);
    expect(marbles[0].terminal).toBeFalse();
  });

  it('should map (ab|)', () => {
    const marbleDiagram: MarbleDiagram = {
      diagram: '(ab|)',
      values: { a: 1, b: 2 },
    };

    const marbles = diagramToMarbles(marbleDiagram);

    expect(marbles.length).toBe(1);
    expect(marbles[0].value).toBe(1);
    expect(marbles[0].secondaryValue).toBe(2);
    expect(marbles[0].terminal).toBeTrue();
  });
});

describe('marblesToDiagram', () => {
  it('should map empty marble to "-"', () => {
    const marbles = [createEmptyMarble()];

    const diagram = marblesToDiagram(marbles);

    expect(diagram.diagram).toBe('-');
    expect(diagram.values).toEqual({});
  });

  it('should map completion marble with no value to "|"', () => {
    const marbles = [createTerminalMarble()];

    const diagram = marblesToDiagram(marbles);

    expect(diagram.diagram).toBe('|');
    expect(diagram.values).toEqual({});
  });

  it('should map marble with single value to "a"', () => {
    const marbles: MarbleValue[] = [{ value: 1, terminal: false }];

    const diagram = marblesToDiagram(marbles);

    expect(diagram.diagram).toBe('a');
    expect(diagram.values).toEqual({ a: 1 });
  });

  it('should map marble with single value and completion to "(a|)"', () => {
    const marbles: MarbleValue[] = [{ value: 1, terminal: true }];

    const diagram = marblesToDiagram(marbles);

    expect(diagram.diagram).toBe('(a|)');
    expect(diagram.values).toEqual({ a: 1 });
  });

  it('should map marble with multiple values to "(ab)"', () => {
    const marbles: MarbleValue[] = [
      { value: 1, secondaryValue: 2, terminal: false },
    ];

    const diagram = marblesToDiagram(marbles);

    expect(diagram.diagram).toBe('(ab)');
    expect(diagram.values).toEqual({ a: 1, b: 2 });
  });

  it('should map marble with multiple values with completion to "(ab|)"', () => {
    const marbles: MarbleValue[] = [
      { value: 1, secondaryValue: 2, terminal: true },
    ];

    const diagram = marblesToDiagram(marbles);

    expect(diagram.diagram).toBe('(ab|)');
    expect(diagram.values).toEqual({ a: 1, b: 2 });
  });
});
