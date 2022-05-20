import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { createEmptyMarble, MarbleValue } from '../types';

@Component({
  selector: 'rx-input-stream',
  templateUrl: './input-stream.component.html',
  styleUrls: ['./input-stream.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputStreamComponent {
  @Input() public marbles: MarbleValue[] = [];
  @Input() public numberOfTicks!: number;

  @Output() public marblesUpdated = new EventEmitter<MarbleValue[]>();

  public get voidTicks(): void[] {
    const numberOfVoidTicks = this.numberOfTicks - this.marbles.length;
    return [...Array(numberOfVoidTicks)];
  }

  public marbleUpdated(index: number, marble: MarbleValue): void {
    let newValues = [...this.marbles];
    newValues[index] = marble;

    // if updated value is terminal, remove marbles that follow
    if (marble.terminal) {
      newValues = newValues.slice(0, index + 1);
    } else if (this.marbles[index].terminal) {
      newValues = [
        ...newValues,
        ...[...Array(this.numberOfTicks - index)].map(() =>
          createEmptyMarble()
        ),
      ];
    }
    console.log(newValues);
    this.marblesUpdated.emit(newValues);
  }
}
