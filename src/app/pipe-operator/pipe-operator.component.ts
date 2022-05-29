import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  HostBinding,
} from '@angular/core';
import { Diagram } from '../logic/diagram';
import { Operators } from '../logic/operation-map';

@Component({
  selector: 'rx-pipe-operator',
  templateUrl: './pipe-operator.component.html',
  styleUrls: ['./pipe-operator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PipeOperatorComponent {
  @Input() public availableOperations!: Operators[];

  @HostBinding('style.--hue-adjust')
  @Input()
  public hueAdjust!: number;

  @Input() public argument?: string;
  @Input() public diagram?: Diagram;
  @Input() public operation!: Operators;
  @Input() public numberOfTicks!: number;
  @Input() public showRemove!: boolean;

  @Output() public addClicked = new EventEmitter<void>();
  @Output() public argumentChanged = new EventEmitter<string>();
  @Output() public removeClicked = new EventEmitter<void>();
  @Output() public operationSelected = new EventEmitter<Operators>();
  @Output() public diagramChanged = new EventEmitter<Diagram>();
}
