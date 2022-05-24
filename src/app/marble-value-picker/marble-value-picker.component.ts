import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Marble } from '../logic/marble';

@Component({
  selector: 'rx-marble-value-picker',
  templateUrl: './marble-value-picker.component.html',
  styleUrls: ['./marble-value-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarbleValuePickerComponent {
  public formControl = new FormControl(1);

  constructor(public dialogRef: MatDialogRef<MarbleValuePickerComponent>) {}

  public blankClicked(): void {
    this.dialogRef.close(Marble.createEmpty());
  }

  public completeClicked(): void {
    this.dialogRef.close(Marble.createCompletion());
  }

  public emitClicked(): void {
    this.dialogRef.close(Marble.create([this.formControl.value]));
  }

  public emitAndCompleteClicked(): void {
    this.dialogRef.close(Marble.create([this.formControl.value], true));
  }
}
