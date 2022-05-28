import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  HostBinding,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Diagram } from '../logic/diagram';
import { Operators } from '../logic/operation-map';

@Component({
  selector: 'rx-pipe-operator',
  templateUrl: './pipe-operator.component.html',
  styleUrls: ['./pipe-operator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PipeOperatorComponent implements OnInit, OnChanges {
  @Input() public availableOperations!: Operators[];

  @HostBinding('style.--hue-adjust')
  @Input()
  public hueAdjust!: number;

  @Input() public diagram?: Diagram;
  @Input() public operation!: Operators;
  @Input() public numberOfTicks!: number;
  @Input() public showRemove!: boolean;

  @Output() public addClicked = new EventEmitter<void>();
  @Output() public removeClicked = new EventEmitter<void>();
  @Output() public operationSelected = new EventEmitter<Operators>();
  @Output() public diagramChanged = new EventEmitter<Diagram>();

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
