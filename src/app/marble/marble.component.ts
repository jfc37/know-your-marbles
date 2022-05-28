import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { Marble } from '../logic/marble';
import { MarbleValuePickerComponent } from '../marble-value-picker/marble-value-picker.component';

@Component({
  selector: 'rx-marble',
  templateUrl: './marble.component.html',
  styleUrls: ['./marble.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarbleComponent implements OnDestroy {
  @Input() public readonly = false;
  @Input() public marble!: Marble;
  @Output() public marbleUpdated = new EventEmitter<Marble>();

  public get isTerminal(): boolean {
    return this.marble.completion;
  }

  public get isError(): boolean {
    return this.marble.error;
  }

  public get isEmpty(): boolean {
    return this.marble.isBlank();
  }

  public get isEmission(): boolean {
    return Boolean(this.marbleValue);
  }

  public get marbleValue(): string {
    return this.marble.values.join('|');
  }

  private destroy$ = new Subject<void>();

  constructor(public dialog: MatDialog) {}

  public openOptions(): void {
    this.dialog
      .open(MarbleValuePickerComponent)
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => value != null && this.marbleUpdated.emit(value));
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
