import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  modalRef: BsModalRef;
  listTack: any[] = [
    {
      name: 'FrontEnd',
      value: 1,
    },
    {
      name: 'BackEnd',
      value: 2,
    },
    {
      name: 'Devops',
      value: 3,
    },
    {
      name: 'DBA',
      value: 4,
    },
  ];
  @ViewChild('create_post', { static: true }) template: TemplateRef<any>;

  constructor(private modalService: BsModalService) {}

  ngOnInit() {}

  openCreatePost(template: TemplateRef<any>) {
    this.modalService.show(template);
  }
}
