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
  public pipes: { diagram?: Diagram; operation: Operators }[] = [
    { diagram: undefined, operation: Operators.First },
  ];
  public outputDiagram: Diagram = getInitialMarbleDiagram();

  public numberOfTick = 5;
  public operations = [...UNARY_OPERATORS, ...BINARY_OPERATORS];

  public ngOnInit(): void {
    this.recalculateOutputMarbles();
  }

  public primaryInputDiagramChanged(diagram: Diagram): void {
    this.inputDiagram = diagram;
    this.recalculateOutputMarbles();
  }

  public pipeDiagramChanged(diagram: Diagram, index: number): void {
    this.pipes[index].diagram = diagram;
    this.pipes = [...this.pipes];

    this.recalculateOutputMarbles();
  }

  public operationChanged(operation: Operators, index: number): void {
    this.pipes[index].operation = operation;

    if (UNARY_OPERATORS.includes(operation)) {
      this.pipes[index].diagram = undefined;
    } else if (!this.pipes[index].diagram) {
      this.pipes[index].diagram = getInitialMarbleDiagram();
    }
    this.pipes = [...this.pipes];

    this.recalculateOutputMarbles();
  }

  private recalculateOutputMarbles(): void {
    this.outputDiagram = this.pipes.reduce((inputDiagram, pipe) => {
      return invokeOperator(pipe.operation, inputDiagram, pipe.diagram);
    }, this.inputDiagram);
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
