import { Component } from '@angular/core';
import { MarbleValue } from './marble/marble.component';
import { Operations } from './operation/operation.component';

@Component({
  selector: 'rx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public inputTicks: MarbleValue[] = [
    'empty',
    'empty',
    'empty',
    'empty',
    'empty',
  ];
  public outputTicks: MarbleValue[] = [
    'empty',
    'empty',
    'empty',
    'empty',
    'empty',
  ];
  public selectedOperation = Operations.Max;

  public operations: Operations[] = [Operations.Max, Operations.Min];

  public inputTicksChanged(newTicks: MarbleValue[]): void {
    this.inputTicks = newTicks;
    this.recalculateOutputTicks();
  }

  public operationChanged(operation: Operations): void {
    this.selectedOperation = operation;
    this.recalculateOutputTicks();
  }

  private recalculateOutputTicks(): void {
    this.outputTicks = getCalculationFn(this.selectedOperation)(
      this.inputTicks
    );
  }
}

function getCalculationFn(
  operator: Operations
): (...inputs: MarbleValue[][]) => MarbleValue[] {
  switch (operator) {
    case Operations.Max:
      return maxCalculation;

    case Operations.Min:
      return minCalculation;
  }
}

function maxCalculation(input: MarbleValue[]): MarbleValue[] {
  return ['empty', 'empty', 'empty', 'empty', 5];
}

function minCalculation(input: MarbleValue[]): MarbleValue[] {
  return ['empty', 'empty', 'empty', 'empty', 3];
}
