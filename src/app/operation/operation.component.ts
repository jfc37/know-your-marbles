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
import { Operators } from '../logic/operation-map';

@Component({
  selector: 'rx-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OperationComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public availableOperations!: Operators[];
  @Input() public operation!: Operators;

  @Output() public operationSelected = new EventEmitter<Operators>();

  public formControl!: FormControl;

  private destroy$ = new Subject<void>();

  public ngOnInit(): void {
    this.formControl = new FormControl(this.operation);

    this.formControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => this.operationSelected.emit(value));
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['operation'] && !changes['operation'].isFirstChange()) {
      this.formControl.setValue(changes['operation'].currentValue);
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
