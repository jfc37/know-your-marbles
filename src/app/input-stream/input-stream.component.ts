import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'rx-input-stream',
  templateUrl: './input-stream.component.html',
  styleUrls: ['./input-stream.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputStreamComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
