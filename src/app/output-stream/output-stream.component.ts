import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'rx-output-stream',
  templateUrl: './output-stream.component.html',
  styleUrls: ['./output-stream.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OutputStreamComponent {
  @Input() public tickValues: (number | null)[] = [];
}
