import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  OperatorArgument,
  Operators,
  OPERATOR_ARGUMENT_MAP,
} from '../logic/operators';

@Component({
  selector: 'rx-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OperationComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public availableOperations!: Operators[];
  @Input() public operation!: Operators;
  @Input() public argument?: string;

  @Output() public operationSelected = new EventEmitter<Operators>();
  @Output() public argumentChanged = new EventEmitter<string>();

  public formControl!: FormControl;
  public argumentFormControl!: FormControl;

  public get isValueArgument(): boolean {
    return (
      getArgumentTypeForOperator(this.operation) === OperatorArgument.Value
    );
  }

  public get isEvaluationArgument(): boolean {
    return (
      getArgumentTypeForOperator(this.operation) === OperatorArgument.Evaluation
    );
  }

  public get isProjectionArgument(): boolean {
    return (
      getArgumentTypeForOperator(this.operation) === OperatorArgument.Projection
    );
  }

  private destroy$ = new Subject<void>();

  public ngOnInit(): void {
    this.formControl = new FormControl(this.operation);
    this.argumentFormControl = new FormControl(this.argument, {
      updateOn: 'blur',
    });

    this.formControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => this.operationSelected.emit(value));

    this.argumentFormControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => this.argumentChanged.emit(value));
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['operation'] && !changes['operation'].isFirstChange()) {
      this.formControl.setValue(changes['operation'].currentValue);
    }
    if (changes['argument'] && !changes['argument'].isFirstChange()) {
      this.argumentFormControl.setValue(changes['argument'].currentValue);
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

function getArgumentTypeForOperator(operator: Operators): OperatorArgument {
  return OPERATOR_ARGUMENT_MAP[operator] || OperatorArgument.None;
}
