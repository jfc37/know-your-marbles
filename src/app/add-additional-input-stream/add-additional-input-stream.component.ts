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
  @Input() public secondaryStreamEnabled!: boolean;

  @Output() public toggleSecondaryStream = new EventEmitter<void>();

  public get buttonText(): string {
    return this.secondaryStreamEnabled
      ? 'Remove second stream'
      : 'Add second stream';
  }
}
