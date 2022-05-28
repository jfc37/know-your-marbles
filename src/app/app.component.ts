import { Component, OnInit } from '@angular/core';
import { Diagram } from './logic/diagram';
import { invokeOperator, Operators } from './logic/operation-map';

@Component({
  selector: 'rx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public inputDiagram: Diagram = getInitialMarbleDiagram();
  public secondaryInputDiagram?: Diagram = undefined;
  public outputDiagram: Diagram = getInitialMarbleDiagram();

  public selectedOperation = Operators.First;
  public numberOfTick = 5;

  public get hasSecondaryInputDiagram(): boolean {
    return this.secondaryInputDiagram != null;
  }

  public operations = [...UNARY_OPERATORS, ...BINARY_OPERATORS];

  public ngOnInit(): void {
    this.recalculateOutputMarbles();
  }

  public primaryInputDiagramChanged(diagram: Diagram): void {
    this.inputDiagram = diagram;
    this.recalculateOutputMarbles();
  }

  public secondaryInputDiagramChanged(diagram: Diagram): void {
    this.secondaryInputDiagram = diagram;
    this.recalculateOutputMarbles();
  }

  public operationChanged(operation: Operators): void {
    this.selectedOperation = operation;

    if (UNARY_OPERATORS.includes(operation)) {
      this.secondaryInputDiagram = undefined;
    } else if (!this.secondaryInputDiagram) {
      this.secondaryInputDiagram = getInitialMarbleDiagram();
    }

    this.recalculateOutputMarbles();
  }

  private recalculateOutputMarbles(): void {
    this.outputDiagram = invokeOperator(
      this.selectedOperation,
      this.inputDiagram,
      this.secondaryInputDiagram!
    );
  }
}

const UNARY_OPERATORS = [Operators.First, Operators.Max, Operators.Min];
const BINARY_OPERATORS = [
  Operators.ConcatWith,
  Operators.Merge,
  Operators.SwitchMap,
  Operators.TakeUntil,
];

function getInitialMarbleDiagram(): Diagram {
  return Diagram.createWithBlankTicks(5);
}
