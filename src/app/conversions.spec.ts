import { Diagram } from './logic/diagram';
import { Marble } from './logic/marble';
import { marblesToDiagram } from './logic/marble.utils';

describe('diagramToMarbles', () => {
  it('should map "-"', () => {
    const diagram = Diagram.create('-');

    const marbles = diagram.toMarbles();

    expect(marbles.length).toBe(1);
    expect(marbles[0].values).toEqual([]);
    expect(marbles[0].completion).toBeFalse();
    expect(marbles[0].error).toBeFalse();
  });

  it('should map "|"', () => {
    const diagram = Diagram.create('|');

    const marbles = diagram.toMarbles();

    expect(marbles.length).toBe(1);
    expect(marbles[0].values).toEqual([]);
    expect(marbles[0].completion).toBeTrue();
    expect(marbles[0].error).toBeFalse();
  });

  it('should map "#"', () => {
    const diagram = Diagram.create('#');

    const marbles = diagram.toMarbles();

    expect(marbles.length).toBe(1);
    expect(marbles[0].values).toEqual([]);
    expect(marbles[0].completion).toBeFalse();
    expect(marbles[0].error).toBeTrue();
  });

  it('should map "a"', () => {
    const diagram = Diagram.create('a', { a: 1 });

    const marbles = diagram.toMarbles();

    expect(marbles.length).toBe(1);
    expect(marbles[0].values[0]).toBe(1);
    expect(marbles[0].completion).toBeFalse();
    expect(marbles[0].error).toBeFalse();
  });

  it('should map (a|)', () => {
    const diagram = Diagram.create('(a|)', { a: 1 });

    const marbles = diagram.toMarbles();

    expect(marbles.length).toBe(1);
    expect(marbles[0].values[0]).toBe(1);
    expect(marbles[0].completion).toBeTrue();
    expect(marbles[0].error).toBeFalse();
  });

  it('should map --(a|)', () => {
    const diagram = Diagram.create('--(a|)', { a: 1 });

    const marbles = diagram.toMarbles();

    expect(marbles.length).toBe(3);
    expect(marbles[2].values[0]).toBe(1);
    expect(marbles[2].completion).toBeTrue();
  });

  it('should map (ab)', () => {
    const diagram = Diagram.create('(ab)', { a: 1, b: 2 });

    const marbles = diagram.toMarbles();

    expect(marbles.length).toBe(1);
    expect(marbles[0].values[0]).toBe(1);
    expect(marbles[0].values[1]).toBe(2);
    expect(marbles[0].completion).toBeFalse();
  });

  it('should map (abc)', () => {
    const diagram = Diagram.create('(abc)', { a: 1, b: 2, c: 3 });

    const marbles = diagram.toMarbles();

    expect(marbles.length).toBe(1);
    expect(marbles[0].values[0]).toBe(1);
    expect(marbles[0].values[1]).toBe(2);
    expect(marbles[0].values[2]).toBe(3);
    expect(marbles[0].completion).toBeFalse();
  });

  it('should map (ab|)', () => {
    const diagram = Diagram.create('(ab|)', { a: 1, b: 2 });

    const marbles = diagram.toMarbles();

    expect(marbles.length).toBe(1);
    expect(marbles[0].values[0]).toBe(1);
    expect(marbles[0].values[1]).toBe(2);
    expect(marbles[0].completion).toBeTrue();
  });
});

describe('marblesToDiagram', () => {
  it('should map empty marble to "-"', () => {
    const marbles = [Marble.createEmpty()];

    const diagram = marblesToDiagram(marbles);

    expect(diagram.diagram).toBe('-');
    expect(diagram.values).toEqual({});
  });

  it('should map error marble to "#"', () => {
    const marbles = [Marble.createError()];

    const diagram = marblesToDiagram(marbles);

    expect(diagram.diagram).toBe('#');
    expect(diagram.values).toEqual({});
  });

  it('should map completion marble with no value to "|"', () => {
    const marbles = [Marble.createCompletion()];

    const diagram = marblesToDiagram(marbles);

    expect(diagram.diagram).toBe('|');
    expect(diagram.values).toEqual({});
  });

  it('should map marble with single value to "a"', () => {
    const marbles = [Marble.create([1])];

    const diagram = marblesToDiagram(marbles);

    expect(diagram.diagram).toBe('a');
    expect(diagram.values).toEqual({ a: 1 });
  });

  it('should map marble with single value and completion to "(a|)"', () => {
    const marbles = [Marble.create([1], true)];

    const diagram = marblesToDiagram(marbles);

    expect(diagram.diagram).toBe('(a|)');
    expect(diagram.values).toEqual({ a: 1 });
  });

  it('should map marble with multiple values to "(ab)"', () => {
    const marbles = [Marble.create([1, 2], false)];

    const diagram = marblesToDiagram(marbles);

    expect(diagram.diagram).toBe('(ab)');
    expect(diagram.values).toEqual({ a: 1, b: 2 });
  });

  it('should map marble with multiple values with completion to "(ab|)"', () => {
    const marbles = [Marble.create([1, 2], true)];

    const diagram = marblesToDiagram(marbles);

    expect(diagram.diagram).toBe('(ab|)');
    expect(diagram.values).toEqual({ a: 1, b: 2 });
  });
});
