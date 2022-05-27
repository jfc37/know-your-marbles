import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';

@Component({
  selector: 'rx-add-additional-input-stream',
  templateUrl: './add-additional-input-stream.component.html',
  styleUrls: ['./add-additional-input-stream.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddAdditionalInputStreamComponent {
  @Input() public secondaryDiagramEnabled!: boolean;

  @Output() public toggleSecondaryDiagram = new EventEmitter<void>();

  public get icon(): string {
    return this.secondaryDiagramEnabled ? '-' : '+';
  }
}
