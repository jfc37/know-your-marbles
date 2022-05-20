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

export function combineMarbles(
  marbleOne?: MarbleValue,
  marbleTwo?: MarbleValue
): MarbleValue {
  return {
    terminal: false,
    value: marbleOne?.value ?? null,
    secondaryValue: marbleTwo?.value ?? undefined,
  };
}
