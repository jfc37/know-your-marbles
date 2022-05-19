import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { MarbleValue } from '../marble/marble.component';

@Component({
  selector: 'rx-input-stream',
  templateUrl: './input-stream.component.html',
  styleUrls: ['./input-stream.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputStreamComponent {
  @Input() public tickValues: MarbleValue[] = [];

  @Output() public tickValuesUpdated = new EventEmitter<MarbleValue[]>();

  public valueUpdated(index: number, value: MarbleValue): void {
    const newValues = [...this.tickValues];
    newValues[index] = value;

    // if updated value is terminal, set following ticks to be void
    if (value === 'terminal') {
      for (let i = index + 1; i < newValues.length; i++) {
        newValues[i] = 'void';
      }
    }

    // if previous value was terminal, set following ticks to be empty
    if (this.tickValues[index] === 'terminal') {
      for (let i = index + 1; i < newValues.length; i++) {
        newValues[i] = 'empty';
      }
    }

    this.tickValuesUpdated.emit(newValues);
  }
}
