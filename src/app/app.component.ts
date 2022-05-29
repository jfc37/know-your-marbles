import { Component, OnInit } from '@angular/core';
import { Diagram } from './logic/diagram';
import { invokeOperator } from './logic/invokie-operator';
import {
  DEFAULT_OPERATOR_ARGUMENT_MAP,
  Operators,
  Pipe,
} from './logic/operators';

@Component({
  selector: 'rx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public inputDiagram: Diagram = getInitialMarbleDiagram();
  public pipes = [getDefaultPipe()];
  public outputDiagram: Diagram = getInitialMarbleDiagram();

  public numberOfTick = 5;
  public operations = [...UNARY_OPERATORS, ...BINARY_OPERATORS].sort((a, b) =>
    a < b ? -1 : 1
  );

  public ngOnInit(): void {
    this.recalculateOutputMarbles();
  }

  public addPipe(index: number): void {
    this.pipes.splice(index + 1, 0, getDefaultPipe());

    this.recalculateOutputMarbles();
  }

  public removePipe(index: number): void {
    this.pipes.splice(index, 1);

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

  public argumentChanged(argument: string, index: number): void {
    this.pipes[index].argument = argument;

    this.recalculateOutputMarbles();
  }

  public operationChanged(operation: Operators, index: number): void {
    this.pipes[index].operation = operation;
    this.pipes[index].argument = getDefaultArgumentForOperator(operation);

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
      return invokeOperator(
        pipe.operation,
        inputDiagram,
        pipe.diagram,
        pipe.argument
      );
    }, this.inputDiagram);
  }
}

const UNARY_OPERATORS = [
  Operators.Delay,
  Operators.DebounceTime,
  Operators.Distinct,
  Operators.DistinctUntilChanged,
  Operators.Filter,
  Operators.First,
  Operators.Map,
  Operators.Max,
  Operators.Min,
  Operators.StartWith,
];

const BINARY_OPERATORS = [
  Operators.CatchError,
  Operators.CombineLatestWith,
  Operators.ConcatWith,
  Operators.Merge,
  Operators.RaceWith,
  Operators.SwitchMap,
  Operators.TakeUntil,
  Operators.WithLatestFrom,
];

function getInitialMarbleDiagram(): Diagram {
  return Diagram.createWithBlankTicks(5);
}

function getDefaultPipe(): Pipe {
  return { diagram: undefined, operation: Operators.First };
}

function getDefaultArgumentForOperator(operator: Operators): string {
  return DEFAULT_OPERATOR_ARGUMENT_MAP[operator] || undefined;
}
