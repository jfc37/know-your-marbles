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
import { marblesToDiagram } from '../conversions';
import { Diagram, Marble } from '../types';

@Component({
  selector: 'rx-input-stream',
  templateUrl: './input-stream.component.html',
  styleUrls: ['./input-stream.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputStreamComponent implements OnInit, OnChanges {
  @Input() public diagram!: Diagram;
  @Input() public numberOfTicks!: number;

  @Output() public diagramUpdated = new EventEmitter<Diagram>();

  public marbles: Marble[] = [];

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
    return [...Array(numberOfVoidTicks)];
  }

  public marbleUpdated(index: number, marble: Marble): void {
    let newValues = [...this.marbles];
    newValues[index] = marble;

    // if updated value is terminal, remove marbles that follow
    if (marble.completion) {
      newValues = newValues.slice(0, index + 1);
    } else if (this.marbles[index].completion) {
      newValues = [
        ...newValues,
        ...[...Array(this.numberOfTicks - index - 1)].map(() =>
          Marble.createEmpty()
        ),
      ];
    }

    const updatedDiagram = marblesToDiagram(newValues);

    this.diagramUpdated.emit(updatedDiagram);
  }
}
