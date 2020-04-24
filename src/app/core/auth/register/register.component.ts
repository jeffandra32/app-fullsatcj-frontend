import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from 'src/app/core/services/auth.service';
import { NewUserDTO } from './../../interfaces/new-user';
import { ToastrMessage } from 'src/app/core/enums/toastr';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  returnUrl: string;
  loadingLogin: boolean;
  userInfo: NewUserDTO = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  };

  /**
   * Creates an instance of LoginComponent.
   * @param {FormBuilder} formBuilder
   * @param {ActivatedRoute} route
   * @param {Router} router
   * @param {AuthenticationService} authenticationService
   * @param {NbToastrService} toastrService
   * @memberof LoginComponent
   */
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });

    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/auth/login';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  /**
   * Envia credenciais para o serviço
   * @returns
   * @memberof LoginComponent
   */
  onRegister() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.userInfo = {
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      confirmPassword: this.registerForm.value.confirmPassword,
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
    };

    if (this.userInfo.password !== this.userInfo.confirmPassword) {
      this.toastr.warning('', ToastrMessage.WARNING_AUTH_REGISTER, {
        timeOut: 2000,
      });
      return;
    }

    this.loadingLogin = true;
    this.authenticationService.register(this.userInfo).subscribe(
      () => {
        this.submitted = false;
        this.loadingLogin = false;
        this.registerForm.reset();
        this.toastr.success('', ToastrMessage.SUCESS_AUTH_REGISTER, {
          timeOut: 2000,
        });

        this.router.navigate([this.returnUrl]);
      },
      () => {
        this.loadingLogin = false;
        this.submitted = false;
        this.toastr.error(ToastrMessage.ERROR_AUTH_REGISTER, 'Erro ao tentar Cadastrar o Usuário', {
          timeOut: 2500,
        });
      }
    );
  }
}
