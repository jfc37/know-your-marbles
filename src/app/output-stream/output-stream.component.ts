import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { MarbleValue } from '../types';

@Component({
  selector: 'rx-output-stream',
  templateUrl: './output-stream.component.html',
  styleUrls: ['./output-stream.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OutputStreamComponent {
  @Input() public marbles!: MarbleValue[];
  @Input() public numberOfTicks!: number;

  public get voidTicks(): void[] {
    const numberOfVoidTicks = this.numberOfTicks - this.marbles.length;
    return [...Array(numberOfVoidTicks)];
  }
}
