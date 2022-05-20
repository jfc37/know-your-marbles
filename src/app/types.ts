export enum Operations {
  Min = 'min',
  Max = 'max',
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
