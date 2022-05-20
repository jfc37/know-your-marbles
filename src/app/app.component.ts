import { Component } from '@angular/core';
import { getCalculationFn } from './operator-calculations';
import { createEmptyMarble, MarbleValue, Operations } from './types';

@Component({
  selector: 'rx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public inputStream: MarbleValue[] = [
    createEmptyMarble(),
    createEmptyMarble(),
    createEmptyMarble(),
    createEmptyMarble(),
    createEmptyMarble(),
  ];
  public outputStream: MarbleValue[] = [
    createEmptyMarble(),
    createEmptyMarble(),
    createEmptyMarble(),
    createEmptyMarble(),
    createEmptyMarble(),
  ];
  public selectedOperation = Operations.First;

  public operations: Operations[] = UNARY_OPERATORS;
  public numberOfTick = 5;

  public inputStreamChanged(marbles: MarbleValue[]): void {
    this.inputStream = marbles;
    this.recalculateOutputMarbles();
  }

  public operationChanged(operation: Operations): void {
    this.selectedOperation = operation;
    this.recalculateOutputMarbles();
  }

  private recalculateOutputMarbles(): void {
    this.outputStream = getCalculationFn(this.selectedOperation)(
      this.inputStream
    );
  }
}

const UNARY_OPERATORS = [Operations.First, Operations.Max, Operations.Min];
