import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  HostBinding,
} from '@angular/core';
import { Diagram } from '../logic/diagram';
import { Marble } from '../logic/marble';

@Component({
  selector: 'rx-output-stream',
  templateUrl: './output-stream.component.html',
  styleUrls: ['./output-stream.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OutputStreamComponent implements OnInit, OnChanges {
  @HostBinding('style.--hue-adjust')
  @Input()
  public hueAdjust!: number;

  @Input() public diagram!: Diagram;
  @Input() public numberOfTicks!: number;

  public marbles!: Marble[];

  public ngOnInit(): void {
    this.marbles = this.diagram.toMarbles();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['diagram'] && !changes['diagram'].isFirstChange()) {
      this.marbles = this.diagram.toMarbles();
    }
  }

  public get voidTicks(): void[] {
    const numberOfVoidTicks = this.numberOfTicks - this.marbles.length;
    return numberOfVoidTicks > 0 ? [...Array(numberOfVoidTicks)] : [];
  }
}
