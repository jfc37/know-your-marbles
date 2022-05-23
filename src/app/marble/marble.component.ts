import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MarbleValuePickerComponent } from '../marble-value-picker/marble-value-picker.component';
import { Marble } from '../types';

@Component({
  selector: 'rx-marble',
  templateUrl: './marble.component.html',
  styleUrls: ['./marble.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarbleComponent {
  @Input() public readonly = false;
  @Input() public marble!: Marble;
  @Output() public marbleUpdated = new EventEmitter<Marble>();

  public get isTerminal(): boolean {
    return this.marble.completion;
  }

  public get isEmpty(): boolean {
    return !this.marble.completion && !this.isEmission;
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
