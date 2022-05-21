import { diagramToMarbles } from './conversions';
import { MarbleDiagram } from './types';

describe('diagramToMarbles', () => {
  it('should map "-" to empty marble', () => {
    const marbleDiagram: MarbleDiagram = {
      diagram: '-',
      values: {},
    };

    const marbles = diagramToMarbles(marbleDiagram);

    expect(marbles.length).toBe(1);
    expect(marbles[0].value).toBeNull();
  });
});
