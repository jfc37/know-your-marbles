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
    this.tickValuesUpdated.emit(newValues);
  }
}
