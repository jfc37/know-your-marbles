import {
  combineMarbles,
  createEmptyMarble,
  createTerminalMarble,
  MarbleValue,
  Operations,
} from './types';

const OPERATION_CALC_MAP = {
  [Operations.First]: firstCalculation,
  [Operations.Max]: maxCalculation,
  [Operations.Merge]: mergeCalculation,
  [Operations.Min]: minCalculation,
  [Operations.TakeUntil]: takeUntilCalculation,
};

export function getCalculationFn(
  operator: Operations
): (...inputs: MarbleValue[][]) => MarbleValue[] {
  return OPERATION_CALC_MAP[operator];
}

export function mergeCalculation(
  primaryInput: MarbleValue[],
  secondaryInput: MarbleValue[]
): MarbleValue[] {
  const outputLength =
    primaryInput.length > secondaryInput.length
      ? primaryInput.length
      : secondaryInput.length;

  return [...Array(outputLength)].map((_, index) =>
    combineMarbles(primaryInput[index], secondaryInput[index])
  );
}

export function takeUntilCalculation(
  primaryInput: MarbleValue[],
  secondaryInput: MarbleValue[]
): MarbleValue[] {
  const secondaryFirstEmission = secondaryInput.find(
    (marble) => marble.value != null
  );

  if (!secondaryFirstEmission) {
    return primaryInput;
  }

  const terminalIndex = secondaryInput.indexOf(secondaryFirstEmission);
  return [
    ...primaryInput.slice(0, terminalIndex),
    createTerminalMarble(primaryInput[terminalIndex].value),
  ];
}

export function firstCalculation(input: MarbleValue[]): MarbleValue[] {
  const firstEmission = input.find((marble) => marble.value != null);

  if (!firstEmission) {
    return input.map(() => createEmptyMarble());
  }

  const firstEmissionIndex = input.indexOf(firstEmission);
  return [
    ...[...Array(firstEmissionIndex)].map(() => createEmptyMarble()),
    createTerminalMarble(firstEmission.value),
  ];
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
  const terminalMarble = input.find((marble) => marble.terminal);
  if (!terminalMarble) {
    return input.map((_) => createEmptyMarble());
  }
  const terminalIndex = input.indexOf(terminalMarble);

  const max = input
    .map((marble) => marble.value)
    .filter((value) => value != null)
    .sort((a, b) => (a! > b! ? 1 : -1))[0];

  return [...Array(input.length)].map((_, index) => {
    if (index < terminalIndex) {
      return createEmptyMarble();
    } else {
      return createTerminalMarble(max);
    }
  });
}
