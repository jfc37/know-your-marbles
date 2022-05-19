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
  @Input() public value: MarbleValue = 'empty';
  @Output() public valueUpdated = new EventEmitter<MarbleValue>();

  public get isTerminal(): boolean {
    return this.value === 'terminal';
  }

  public get isEmpty(): boolean {
    return this.value === 'empty';
  }

  public get isEmission(): boolean {
    return !this.isTerminal && !this.isEmpty;
  }

  public emptyMarbleClicked(): void {
    this.valueUpdated.emit(0);
  }
}

export type MarbleValue = number | 'empty' | 'terminal' | 'void';
