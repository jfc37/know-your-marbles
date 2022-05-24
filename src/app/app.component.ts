import { Component, OnInit } from '@angular/core';
import { Diagram } from './logic/diagram';
import { invokeOperator, Operations } from './logic/operation-map';

@Component({
  selector: 'rx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public primaryInputDiagram: Diagram = getInitialMarbleDiagram();
  public secondaryInputDiagram?: Diagram = undefined;
  public outputDiagram: Diagram = getInitialMarbleDiagram();

  public selectedOperation = Operations.First;
  public numberOfTick = 5;

  public get hasSecondaryInputDiagram(): boolean {
    return this.secondaryInputDiagram != null;
  }

  public get operations(): Operations[] {
    return this.hasSecondaryInputDiagram ? BINARY_OPERATORS : UNARY_OPERATORS;
  }

  public ngOnInit(): void {
    this.recalculateOutputMarbles();
  }

  public primaryInputDiagramChanged(diagram: Diagram): void {
    this.primaryInputDiagram = diagram;
    this.recalculateOutputMarbles();
  }

  public secondaryInputDiagramChanged(diagram: Diagram): void {
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
    this.outputDiagram = invokeOperator(
      this.selectedOperation,
      this.primaryInputDiagram,
      this.secondaryInputDiagram!
    );
  }
}

const UNARY_OPERATORS = [Operations.First, Operations.Max, Operations.Min];
const BINARY_OPERATORS = [Operations.Merge, Operations.TakeUntil];

function getInitialMarbleDiagram(): Diagram {
  return Diagram.createWithBlankTicks(5);
}
