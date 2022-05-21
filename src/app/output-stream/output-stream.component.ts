import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { diagramToMarbles } from '../conversions';
import { MarbleDiagram, MarbleValue } from '../types';

@Component({
  selector: 'rx-output-stream',
  templateUrl: './output-stream.component.html',
  styleUrls: ['./output-stream.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OutputStreamComponent implements OnInit, OnChanges {
  @Input() public diagram!: MarbleDiagram;
  @Input() public numberOfTicks!: number;

  public marbles!: MarbleValue[];

  public ngOnInit(): void {
    this.marbles = diagramToMarbles(this.diagram);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['diagram'] && !changes['diagram'].isFirstChange()) {
      this.marbles = diagramToMarbles(changes['diagram'].currentValue);
    }
  }

  public get voidTicks(): void[] {
    const numberOfVoidTicks = this.numberOfTicks - this.marbles.length;
    return [...Array(numberOfVoidTicks)];
  }
}
