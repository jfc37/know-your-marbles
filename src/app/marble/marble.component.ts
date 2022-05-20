import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MarbleValuePickerComponent } from '../marble-value-picker/marble-value-picker.component';
import { MarbleValue } from '../types';

@Component({
  selector: 'rx-marble',
  templateUrl: './marble.component.html',
  styleUrls: ['./marble.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarbleComponent {
  @Input() public readonly = false;
  @Input() public value: MarbleValue = 'empty';
  @Output() public valueUpdated = new EventEmitter<MarbleValue>();

  public get isTerminal(): boolean {
    return this.value === 'terminal';
  }

  public get isEmpty(): boolean {
    return this.value === 'empty';
  }

  public get isVoid(): boolean {
    return this.value === 'void';
  }

  public get isEmission(): boolean {
    return typeof this.value == 'number';
  }

  constructor(public dialog: MatDialog) {}

  public openOptions(): void {
    this.dialog
      .open(MarbleValuePickerComponent)
      .afterClosed()
      .subscribe((value) => value != null && this.valueUpdated.emit(value));
  }
}
