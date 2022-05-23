export enum Operations {
  First = 'first',
  Max = 'max',
  Merge = 'merge',
  Min = 'min',
  TakeUntil = 'take until',
}
export interface MarbleValue {
  values: number[];
  terminal: boolean;
}
export interface MarbleDiagram {
  diagram: string;
  values: { [key: string]: number };
}

export function createEmptyMarble(): MarbleValue {
  return {
    terminal: false,
    values: [],
  };
}

export function createTerminalMarble(value: number | null = null): MarbleValue {
  return {
    terminal: true,
    values: [],
  };
}

export function isBlankMarble(marble: MarbleValue): boolean {
  return !marble.terminal && marble.values.length === 0;
}

export function isCompletionWithNoEmitMarble(marble: MarbleValue): boolean {
  return marble.terminal && marble.values.length === 0;
}

export function doesMarbleContainCompletion(marble: MarbleValue): boolean {
  return marble.terminal;
}

export function isSingleEmitMarble(marble: MarbleValue): boolean {
  return !marble.terminal && marble.values.length === 1;
}
