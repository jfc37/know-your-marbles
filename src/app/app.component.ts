import { Component } from '@angular/core';
import { getCalculationFn } from './operator-calculations';
import {
  createEmptyMarble,
  createTerminalMarble,
  MarbleValue,
  Operations,
} from './types';

@Component({
  selector: 'rx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public inputMarbles: MarbleValue[] = [
    createEmptyMarble(),
    createEmptyMarble(),
    createEmptyMarble(),
    createEmptyMarble(),
    createEmptyMarble(),
  ];
  public outputMarbles: MarbleValue[] = [
    createEmptyMarble(),
    createEmptyMarble(),
    createEmptyMarble(),
    createEmptyMarble(),
    createEmptyMarble(),
  ];
  public selectedOperation = Operations.First;

  public operations: Operations[] = UNARY_OPERATORS;
  public numberOfTick = 5;

  public inputMarblesChanged(marbles: MarbleValue[]): void {
    this.inputMarbles = marbles;
    this.recalculateOutputMarbles();
  }

  public operationChanged(operation: Operations): void {
    this.selectedOperation = operation;
    this.recalculateOutputMarbles();
  }

  private recalculateOutputMarbles(): void {
    this.outputMarbles = getCalculationFn(this.selectedOperation)(
      this.inputMarbles
    );
  }
}

const UNARY_OPERATORS = [Operations.First, Operations.Max, Operations.Min];
