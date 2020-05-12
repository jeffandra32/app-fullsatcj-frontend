import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from './../../../core/services/user.service';

@Component({
  selector: 'app-edit-perfil',
  templateUrl: './edit-perfil.component.html',
  styleUrls: ['./edit-perfil.component.css'],
})
export class EditPerfilComponent implements OnInit {
  editPerfilForm: FormGroup;
  @Input() userId: string;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.editPerfilForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      title: ['', Validators.required],
      linkedin: ['', Validators.required],
      github: ['', Validators.required],
      bio: ['', Validators.required],
    });
  }

  /**
   * @todo Inserir método para atualizar o perfil do usuário.
   * @memberof EditPerfilComponent
   */
  onUpdate() {
    const data = this.editPerfilForm.value;
    this.userService.updateUser(data).subscribe(
      (res) => {
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
