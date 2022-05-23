import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { createEmptyMarble, MarbleValue } from '../types';

@Component({
  selector: 'rx-marble-value-picker',
  templateUrl: './marble-value-picker.component.html',
  styleUrls: ['./marble-value-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarbleValuePickerComponent {
  public formGroup = new FormGroup({
    terminal: new FormControl(false),
    value: new FormControl(1),
  });

  constructor(public dialogRef: MatDialogRef<MarbleValuePickerComponent>) {}

  public emptyClicked(): void {
    this.dialogRef.close(createEmptyMarble());
  }

  public valueClicked(): void {
    const marble: MarbleValue = {
      terminal: this.formGroup.value.terminal,
      values: [this.formGroup.value.value].filter((value) => value != null),
    };
    this.dialogRef.close(marble);
  }
}
