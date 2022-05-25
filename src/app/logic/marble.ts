export class Marble {
  private constructor(
    public readonly values: number[],
    public readonly completion: boolean,
    public readonly error: boolean
  ) {}

  public isBlank(): boolean {
    return !this.error && !this.completion && this.values.length === 0;
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
    } else if (this.error) {
      return { diagram: '#', values: {}, keyIndex };
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
    return new Marble([], false, false);
  }

  static createCompletion(): Marble {
    return new Marble([], true, false);
  }

  static createError(): Marble {
    return new Marble([], false, true);
  }

  static create(values: number[], completion = false, error = false) {
    return new Marble(
      values.filter((value) => value != null),
      completion,
      error
    );
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
