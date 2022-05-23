import { Marble } from './marble';

export class Diagram {
  private constructor(
    public readonly diagram: string,
    public readonly values: Record<string, number> = {}
  ) {}

  public toMarbles(): Marble[] {
    const marbles: Marble[] = [];
    let index = 0;
    while (index < this.diagram.length) {
      const result = this.currentTickToMarble(index);
      marbles.push(result.marble);
      index = result.nextTickIndex;
    }

    return marbles;
  }

  public prepend(toPrepend: string | Diagram): Diagram {
    if (typeof toPrepend === 'string') {
      return Diagram.create(this.diagram + toPrepend, this.values);
    }

    return Diagram.create(this.diagram + toPrepend.diagram, {
      ...this.values,
      ...toPrepend.values,
    });
  }

  public get emittedValues(): number[] {
    return [...Object.values(this.values)];
  }

  public get hasNoEmittedValues(): boolean {
    return this.emittedValues.length === 0;
  }

  private currentTickToMarble(index: number): {
    marble: Marble;
    nextTickIndex: number;
  } {
    const startOfTick = this.diagram[index];
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
      const closingIndex = this.diagram.indexOf(')', index);
      this.diagram.substring(openingIndex + 1, closingIndex);
      const values = this.diagram.substring(openingIndex + 1, closingIndex);
      return {
        marble: Marble.create(
          [this.values[values[0]], this.values[values[1]]],
          values.includes('|')
        ),
        nextTickIndex: closingIndex + 1,
      };
    } else {
      return {
        marble: Marble.create([this.values[this.diagram[index]]]),
        nextTickIndex: index + 1,
      };
    }
  }

  static create(diagram: string, values: Record<string, number> = {}): Diagram {
    return new Diagram(diagram, values);
  }

  static createWithBlankTicks(ticks: number): Diagram {
    const diagram = [...Array(ticks)].map((_) => '-').join('');
    return new Diagram(diagram);
  }
}

enum MarbleSymbol {
  Blank = '-',
  Completion = '|',
  Group = '(',
}
