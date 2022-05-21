export enum Operations {
  First = 'first',
  Max = 'max',
  Merge = 'merge',
  Min = 'min',
  TakeUntil = 'take until',
}
export interface MarbleValue {
  value: number | null;
  secondaryValue?: number;
  terminal: boolean;
}
export interface MarbleDiagram {
  diagram: string;
  values: { [key: string]: number };
}

export function createEmptyMarble(): MarbleValue {
  return {
    terminal: false,
    value: null,
  };
}

export function createTerminalMarble(value: number | null = null): MarbleValue {
  return {
    terminal: true,
    value,
  };
}
