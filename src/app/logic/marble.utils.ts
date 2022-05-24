import { TestMessage } from 'rxjs/internal/testing/TestMessage';
import { Diagram } from './diagram';
import { Marble } from './marble';

export function marblesToDiagram(marbles: Marble[]): Diagram {
  let keyIndex = 0;

  return marbles.reduce((fullDiagram, marble) => {
    const result = marble.toDiagram(keyIndex);
    keyIndex = result.keyIndex;
    return Diagram.create(fullDiagram.diagram + result.diagram, {
      ...fullDiagram.values,
      ...result.values,
    });
  }, Diagram.create(''));
}

export function messagesToDiagram(messages: TestMessage[]): Diagram {
  if (!messages || messages.length === 0) {
    return Diagram.createWithBlankTicks(5);
  }

  const totalFrames = messages[messages.length - 1].frame + 1;
  const marbles = [...Array(totalFrames)].map((_, frame) => {
    const messagesForFrame: TestMessage[] = messages.filter(
      (x) => x.frame === frame
    );
    if (messagesForFrame.length === 0) {
      return Marble.createEmpty();
    } else {
      const frameValues = messagesForFrame
        .filter((x) => x.notification.kind === 'N')
        .map((x: any) => x.notification.value);
      const hasCompletion = messagesForFrame.some(
        (x) => x.notification.kind === 'C'
      );
      const hasError = messagesForFrame.some(
        (x) => x.notification.kind === 'E'
      );
      return Marble.create(frameValues, hasCompletion, hasError);
    }
  });
  return marblesToDiagram(marbles);
}
