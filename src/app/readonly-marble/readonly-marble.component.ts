import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'rx-readonly-marble',
  templateUrl: './readonly-marble.component.html',
  styleUrls: ['./readonly-marble.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReadonlyMarbleComponent {
  @Input() public value: number | null = null;
}
