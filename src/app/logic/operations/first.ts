import { cold } from 'jasmine-marbles';
import { TestMessage } from 'rxjs/internal/testing/TestMessage';
import { first as firstRxjs, map } from 'rxjs/operators';
import { TestScheduler } from 'rxjs/testing';
import { Diagram } from '../diagram';
import { getCompletionTick, getFirstEmissionTick } from './utils';

export function first(input: Diagram): Diagram {
  let diagram = Diagram.create('');

  const scheduler = new TestScheduler((messages: TestMessage[]) => {
    console.error('messages', messages);
    const totalFrames = messages[messages.length - 1].frame + 1;
    const outputDiagram = [...Array(totalFrames)];

    console.error('frames', outputDiagram);
  });

  scheduler.run((helpers) => {
    const { cold, expectObservable } = helpers;
    const input$ = cold(input.diagram, input.values);
    const output$ = input$.pipe(map((x) => x + 10));
    expectObservable(output$).toBe('');
  });

  const marbles = input.toMarbles();

  if (input.completes && input.hasNoEmittedValues) {
    const completionTick = getCompletionTick(marbles);

    return Diagram.createWithBlankTicks(completionTick).prepend('#');
  }

  if (input.hasNoEmittedValues) {
    return Diagram.createWithBlankTicks(marbles.length);
  }

  const firstEmissionTick = getFirstEmissionTick(marbles);
  return Diagram.createWithBlankTicks(firstEmissionTick).prepend(
    Diagram.create('(a|)', { a: input.values['a'] })
  );
}
