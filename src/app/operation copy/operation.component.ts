import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Operators } from '../logic/invokie-operator';

@Component({
  selector: 'rx-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OperationComponent implements OnInit, OnChanges {
  @Input() public availableOperations!: Operators[];
  @Input() public operation!: Operators;

  @Output() public operationSelected = new EventEmitter<Operators>();

  public formControl!: FormControl;

  public ngOnInit(): void {
    this.formControl = new FormControl(this.operation);

    this.formControl.valueChanges.subscribe((value) =>
      this.operationSelected.emit(value)
    );
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['operation'] && !changes['operation'].isFirstChange()) {
      this.formControl.setValue(changes['operation'].currentValue);
    }
  }
}
