import { Component } from '@angular/core';
import { getCalculationFn } from './operator-calculations';
import { MarbleValue, Operations } from './types';

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
