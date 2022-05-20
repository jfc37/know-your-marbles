import { MarbleValue, Operations } from './types';

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

maxCalculation(['empty', 2, 'terminal']); /*?*/

export function maxCalculation(input: MarbleValue[]): MarbleValue[] {
  const terminalIndex = input.indexOf('terminal');
  const hasNoTerminal = terminalIndex == -1;
  if (hasNoTerminal) {
    return ['empty', 'empty', 'empty', 'empty', 'empty'];
  }

  const values = input.filter((value) => typeof value == 'number');
  const max = input
    .filter((value) => typeof value == 'number')
    .sort((a, b) => (a > b ? -1 : 1))[0];

  return [...Array(input.length)].map((_, index) => {
    if (index < terminalIndex) {
      return 'empty';
    } else if (index == terminalIndex) {
      return max ?? 'terminal';
    } else {
      return 'void';
    }
  });
}

export function minCalculation(input: MarbleValue[]): MarbleValue[] {
  return ['empty', 'empty', 'empty', 'empty', 3];
}
