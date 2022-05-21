import { Component } from '@angular/core';
import { getCalculationFn } from './operator-calculations';
import { MarbleDiagram, Operations } from './types';

@Component({
  selector: 'rx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public primaryInputDiagram: MarbleDiagram = getInitialMarbleDiagram();
  public secondaryInputDiagram?: MarbleDiagram = undefined;
  public outputDiagram: MarbleDiagram = getInitialMarbleDiagram();

  public selectedOperation = Operations.First;
  public numberOfTick = 5;

  public get hasSecondaryInputDiagram(): boolean {
    return this.secondaryInputDiagram != null;
  }

  public get operations(): Operations[] {
    return this.hasSecondaryInputDiagram ? BINARY_OPERATORS : UNARY_OPERATORS;
  }

  public primaryInputDiagramChanged(diagram: MarbleDiagram): void {
    this.primaryInputDiagram = diagram;
    this.recalculateOutputMarbles();
  }

  public secondaryInputDiagramChanged(diagram: MarbleDiagram): void {
    this.secondaryInputDiagram = diagram;
    this.recalculateOutputMarbles();
  }

  public toggleSecondaryInputDiagram(): void {
    if (this.secondaryInputDiagram) {
      this.secondaryInputDiagram = undefined;
    } else {
      this.secondaryInputDiagram = getInitialMarbleDiagram();
    }

    this.operationChanged(this.operations[0]);
  }

  public operationChanged(operation: Operations): void {
    this.selectedOperation = operation;
    this.recalculateOutputMarbles();
  }

  private recalculateOutputMarbles(): void {
    this.outputDiagram = getCalculationFn(this.selectedOperation)(
      this.primaryInputDiagram,
      this.secondaryInputDiagram!
    );
  }
}

const UNARY_OPERATORS = [Operations.First, Operations.Max, Operations.Min];
const BINARY_OPERATORS = [Operations.Merge, Operations.TakeUntil];

function getInitialMarbleDiagram(): MarbleDiagram {
  return {
    diagram: '-----',
    values: {},
  };
}
