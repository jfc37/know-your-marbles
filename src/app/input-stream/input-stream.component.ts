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
import { diagramToMarbles, marblesToDiagram } from '../conversions';
import { createEmptyMarble, MarbleDiagram, MarbleValue } from '../types';

@Component({
  selector: 'rx-input-stream',
  templateUrl: './input-stream.component.html',
  styleUrls: ['./input-stream.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputStreamComponent implements OnInit, OnChanges {
  @Input() public diagram!: MarbleDiagram;
  @Input() public numberOfTicks!: number;

  @Output() public diagramUpdated = new EventEmitter<MarbleDiagram>();

  public marbles: MarbleValue[] = [];

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

  public marbleUpdated(index: number, marble: MarbleValue): void {
    let newValues = [...this.marbles];
    newValues[index] = marble;

    // if updated value is terminal, remove marbles that follow
    if (marble.terminal) {
      newValues = newValues.slice(0, index + 1);
    } else if (this.marbles[index].terminal) {
      newValues = [
        ...newValues,
        ...[...Array(this.numberOfTicks - index - 1)].map(() =>
          createEmptyMarble()
        ),
      ];
    }

    const updatedDiagram = marblesToDiagram(newValues);

    console.error('xxx', newValues, updatedDiagram);

    this.diagramUpdated.emit(updatedDiagram);
  }
}
