import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { MarbleValue } from '../marble/marble.component';

@Component({
  selector: 'rx-readonly-marble',
  templateUrl: './readonly-marble.component.html',
  styleUrls: ['./readonly-marble.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReadonlyMarbleComponent {
  @Input() public value!: MarbleValue;

  public get isTerminal(): boolean {
    return this.value === 'terminal';
  }

  public get isEmpty(): boolean {
    return this.value === 'empty';
  }

  public get isEmission(): boolean {
    return !this.isTerminal && !this.isEmpty;
  }
}
