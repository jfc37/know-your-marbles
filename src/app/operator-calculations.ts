import {
  createEmptyMarble,
  createTerminalMarble,
  MarbleValue,
  Operations,
} from './types';

export function getCalculationFn(
  operator: Operations
): (...inputs: MarbleValue[][]) => MarbleValue[] {
  switch (operator) {
    case Operations.Max:
      return maxCalculation;

    case Operations.Min:
      return minCalculation;
  }
}

export function maxCalculation(input: MarbleValue[]): MarbleValue[] {
  const terminalMarble = input.find((marble) => marble.terminal);
  if (!terminalMarble) {
    return input.map((_) => createEmptyMarble());
  }
  const terminalIndex = input.indexOf(terminalMarble);

  const max = input
    .map((marble) => marble.value)
    .filter((value) => value != null)
    .sort((a, b) => (a! > b! ? -1 : 1))[0];

  return [...Array(input.length)].map((_, index) => {
    if (index < terminalIndex) {
      return createEmptyMarble();
    } else {
      return createTerminalMarble(max);
    }
  });
}

export function minCalculation(input: MarbleValue[]): MarbleValue[] {
  return input.map((_) => createEmptyMarble());
}
