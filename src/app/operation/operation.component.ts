import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'rx-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OperationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
