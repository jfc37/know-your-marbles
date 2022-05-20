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

  public get hasSecondaryInputStream(): boolean {
    return this.secondaryInputStream != null;
  }

  public get operations(): Operations[] {
    return this.hasSecondaryInputStream ? BINARY_OPERATORS : UNARY_OPERATORS;
  }
  public numberOfTick = 5;

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

    this.recalculateOutputMarbles();
  }

  public operationChanged(operation: Operations): void {
    this.selectedOperation = operation;
    this.recalculateOutputMarbles();
  }

  private recalculateOutputMarbles(): void {
    this.outputStream = getCalculationFn(this.selectedOperation)(
      this.primaryInputStream
    );
  }
}

const UNARY_OPERATORS = [Operations.First, Operations.Max, Operations.Min];
const BINARY_OPERATORS = [Operations.First];

function getInitialStream(): MarbleValue[] {
  return [
    createEmptyMarble(),
    createEmptyMarble(),
    createEmptyMarble(),
    createEmptyMarble(),
    createEmptyMarble(),
  ];
}
