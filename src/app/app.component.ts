import { Component } from '@angular/core';
import { getCalculationFn } from './operator-calculations';
import { createEmptyMarble, MarbleValue, Operations } from './types';

@Component({
  selector: 'rx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public primaryInputStream: MarbleValue[] = getInitialStream();
  public secondaryInputStream?: MarbleValue[] = undefined;
  public outputStream: MarbleValue[] = getInitialStream();

  public selectedOperation = Operations.First;
  public numberOfTick = 5;

  public get hasSecondaryInputStream(): boolean {
    return this.secondaryInputStream != null;
  }

  public get operations(): Operations[] {
    return this.hasSecondaryInputStream ? BINARY_OPERATORS : UNARY_OPERATORS;
  }

  public primaryInputStreamChanged(marbles: MarbleValue[]): void {
    this.primaryInputStream = marbles;
    this.recalculateOutputMarbles();
  }

  public secondaryInputStreamChanged(marbles: MarbleValue[]): void {
    this.secondaryInputStream = marbles;
    this.recalculateOutputMarbles();
  }

  public toggleSecondaryInputStream(): void {
    if (this.secondaryInputStream) {
      this.secondaryInputStream = undefined;
    } else {
      this.secondaryInputStream = getInitialStream();
    }

    this.operationChanged(this.operations[0]);
  }

  public operationChanged(operation: Operations): void {
    this.selectedOperation = operation;
    this.recalculateOutputMarbles();
  }

  private recalculateOutputMarbles(): void {
    this.outputStream = getCalculationFn(this.selectedOperation)(
      this.primaryInputStream,
      this.secondaryInputStream!
    );
  }
}

const UNARY_OPERATORS = [Operations.First, Operations.Max, Operations.Min];
const BINARY_OPERATORS = [Operations.TakeUntil];

function getInitialStream(): MarbleValue[] {
  return [
    createEmptyMarble(),
    createEmptyMarble(),
    createEmptyMarble(),
    createEmptyMarble(),
    createEmptyMarble(),
  ];
}
