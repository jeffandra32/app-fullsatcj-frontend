import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from 'src/app/core/services/auth.service';
import { ResetPasswordDTO } from './../../interfaces/reset-password';
import { ToastrMessage } from 'src/app/core/enums/toastr';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  submitted = false;
  returnUrl: string;
  loadingLogin: boolean;
  token: string;
  creds: ResetPasswordDTO = {
    token: '',
    password: '',
    password_confirmation: '',
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
    private authenticationService: AuthenticationService,
    private toastr: ToastrService,
    private router: Router,
  ) {
    this.loadingLogin = false;
  }

  ngOnInit() {
    this.route.params.subscribe((params) => (this.token = params['token']));
    const token = this.token;

    this.resetPasswordForm = this.formBuilder.group({
      token,
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.resetPasswordForm.controls;
  }

  /**
   * Envia credenciais para o serviço
   * @returns
   * @memberof LoginComponent
   */
  onReset() {
    this.submitted = true;

    if (this.resetPasswordForm.invalid) {
      return;
    }

    this.creds = {
      token: this.resetPasswordForm.value.token,
      password: this.resetPasswordForm.value.password,
      password_confirmation: this.resetPasswordForm.value.password_confirmation,
    };

    if (this.creds.password !== this.creds.password_confirmation) {
      this.toastr.warning('', ToastrMessage.WARNING_AUTH_REGISTER, {
        timeOut: 2000,
      });
      return;
    }

    this.loadingLogin = true;
    this.authenticationService.resetPassword(this.creds).subscribe(
      () => {
        this.loadingLogin = false;
        this.toastr.success('', ToastrMessage.SUCESS_RESET_PASSWORD, {
          timeOut: 2500,
        });
        setTimeout(() => {
          this.router.navigate(['auth/login']);
        }, 1500);
      },
      (error: { status: number }) => {
        this.toastr.error(ToastrMessage.ERROR_RESET_PASSWORD, 'Favor tente mais tarde.', {
          timeOut: 2500,
        });
        this.loadingLogin = false;
      }
    );
  }
}
