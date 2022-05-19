import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'rx-marble',
  templateUrl: './marble.component.html',
  styleUrls: ['./marble.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarbleComponent implements OnInit, OnChanges {
  @Input() public value: MarbleValue = 'empty';
  @Output() public valueUpdated = new EventEmitter<MarbleValue>();

  public formControl!: FormControl;

  public get isTerminal(): boolean {
    return this.value === 'terminal';
  }

  public get isEmpty(): boolean {
    return this.value === 'empty';
  }

  public get isEmission(): boolean {
    return !this.isTerminal && !this.isEmpty;
  }

  public ngOnInit(): void {
    this.formControl = new FormControl(this.value, { updateOn: 'blur' });

    this.formControl.valueChanges.subscribe((value) =>
      this.valueUpdated.emit(value)
    );
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['value'] && !changes['value'].isFirstChange()) {
      this.formControl.setValue(changes['value'].currentValue);
    }
  }

  public emptyMarbleClicked(): void {
    this.valueUpdated.emit(0);
  }
}

export type MarbleValue = number | 'empty' | 'terminal' | 'void';
