import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'rx-marble',
  templateUrl: './marble.component.html',
  styleUrls: ['./marble.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarbleComponent {
  @Input() public value: MarbleValue = null;

  @Output() public valueUpdated = new EventEmitter<MarbleValue>();

  public emptyMarbleClicked(): void {
    this.valueUpdated.emit(0);
  }
}

export type MarbleValue = number | null;
