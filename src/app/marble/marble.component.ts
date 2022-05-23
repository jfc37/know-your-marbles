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
  @Input() public marble!: MarbleValue;
  @Output() public marbleUpdated = new EventEmitter<MarbleValue>();

  public get isTerminal(): boolean {
    return this.marble.terminal;
  }

  public get isEmpty(): boolean {
    return !this.marble.terminal && !this.isEmission;
  }

  public get isEmission(): boolean {
    return Boolean(this.marbleValue);
  }

  public get marbleValue(): string {
    return this.marble.values.join('|');
  }

  constructor(public dialog: MatDialog) {}

  public openOptions(): void {
    this.dialog
      .open(MarbleValuePickerComponent)
      .afterClosed()
      .subscribe((value) => value != null && this.marbleUpdated.emit(value));
  }
}
