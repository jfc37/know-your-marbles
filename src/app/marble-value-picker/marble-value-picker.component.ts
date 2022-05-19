import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'rx-marble-value-picker',
  templateUrl: './marble-value-picker.component.html',
  styleUrls: ['./marble-value-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarbleValuePickerComponent {
  public formControl = new FormControl(1);

  constructor(public dialogRef: MatDialogRef<MarbleValuePickerComponent>) {}

  public terminalClicked(): void {
    this.dialogRef.close('terminal');
  }

  public emptyClicked(): void {
    this.dialogRef.close('empty');
  }

  public valueClicked(): void {
    this.dialogRef.close(Number(this.formControl.value));
  }
}
