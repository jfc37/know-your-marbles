export enum Operations {
  First = 'first',
  Min = 'min',
  Max = 'max',
  TakeUntil = 'take until',
}
export interface MarbleValue {
  value: number | null;
  terminal: boolean;
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
