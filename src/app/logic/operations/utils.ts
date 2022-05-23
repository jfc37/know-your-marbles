import { Marble } from '../marble';

export function neverCompletes(marbles: Marble[]): boolean {
  return !marbles.some((marble) => marble.completion);
}

export function getFirstEmissionTick(marbles: Marble[]): number {
  const first = marbles.find((marble) => marble.values.length > 0);
  return marbles.indexOf(first!);
}

export function getCompletionTick(marbles: Marble[]): number {
  const completion = marbles.find((marble) => marble.completion);
  return marbles.indexOf(completion!);
}
