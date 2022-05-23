export enum Operations {
  First = 'first',
  Max = 'max',
  Merge = 'merge',
  Min = 'min',
  TakeUntil = 'take until',
}

enum MarbleSymbol {
  Blank = '-',
  Completion = '|',
  Group = '(',
}

export class Marble {
  private constructor(
    public readonly values: number[],
    public readonly completion: boolean
  ) {
    this.completion = completion;
    this.values = values;
  }

  public isBlank(): boolean {
    return !this.completion && this.values.length === 0;
  }

  public hasNoValues(): boolean {
    return this.values.length === 0;
  }

  public hasSingleValue(): boolean {
    return this.values.length === 1;
  }

  public toDiagram(keyIndex: number): {
    diagram: string;
    values: { [key: string]: number };
    keyIndex: number;
  } {
    if (this.isBlank()) {
      return { diagram: '-', values: {}, keyIndex };
    } else if (this.completion && this.hasNoValues()) {
      return { diagram: '|', values: {}, keyIndex };
    } else if (!this.completion && this.hasSingleValue()) {
      return {
        diagram: DIAGRAM_VALUE_KEYS[keyIndex],
        values: { [DIAGRAM_VALUE_KEYS[keyIndex]]: this.values[0] },
        keyIndex: keyIndex + 1,
      };
    } else {
      const diagram = [
        '(',
        ...this.values.map((_, index) => DIAGRAM_VALUE_KEYS[keyIndex + index]),
        this.completion && '|',
        ')',
      ]
        .filter(Boolean)
        .join('');
      const values = this.values.reduce(
        (allValues, currentValue, index) => ({
          ...allValues,
          [DIAGRAM_VALUE_KEYS[keyIndex + index]]: currentValue,
        }),
        {}
      );

      return {
        diagram,
        values,
        keyIndex: keyIndex + this.values.length,
      };
    }
  }

  static createEmpty(): Marble {
    return new Marble([], false);
  }

  static createCompletion(): Marble {
    return new Marble([], true);
  }

  static create(values: number[], completion: boolean = false) {
    return new Marble(
      values.filter((value) => value != null),
      completion
    );
  }
}

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

const DIAGRAM_VALUE_KEYS = [
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
