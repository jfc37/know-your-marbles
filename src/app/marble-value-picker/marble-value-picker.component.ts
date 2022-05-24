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
  public formGroup = new FormGroup({
    terminal: new FormControl(false),
    value: new FormControl(null),
  });

  constructor(public dialogRef: MatDialogRef<MarbleValuePickerComponent>) {}

  public emptyClicked(): void {
    this.dialogRef.close(Marble.createEmpty());
  }

  public valueClicked(): void {
    const marble = Marble.create(
      [this.formGroup.value.value],
      this.formGroup.value.terminal
    );
    this.dialogRef.close(marble);
  }
}
