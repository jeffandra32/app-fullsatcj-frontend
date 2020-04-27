import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  modalRef: BsModalRef;
  @ViewChild('create_post',  {static: true}) template: TemplateRef<any>;


  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  openCreatePost(template: TemplateRef<any>) {
    this.modalService.show(template);
  }

}
