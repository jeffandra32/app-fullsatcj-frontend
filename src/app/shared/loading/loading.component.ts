import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  @Input() loadingProccess: boolean;
  @Input() loadingTask: boolean;
  @Input() loadingLogin: boolean;
  constructor() {}

  ngOnInit() {}
}
