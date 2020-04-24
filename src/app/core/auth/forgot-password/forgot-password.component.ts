import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { ToastrMessage } from 'src/app/core/enums/toastr';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm: FormGroup;
  submitted = false;
  returnUrl: string;
  loadingLogin: boolean;

  /**
   * Creates an instance of ForgotPasswordComponent.
   * @param {FormBuilder} formBuilder
   * @param {ActivatedRoute} route
   * @param {Router} router
   * @param {AuthenticationService} authenticationService
   * @param {ToastrService} toastr
   * @memberof ForgotPasswordComponent
   */
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService,
    private router: Router,
  ) {
    this.loadingLogin = false;
  }

  ngOnInit() {
    this.forgotForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.forgotForm.controls;
  }

  /**
   * Envia um e-mail para o serviço.
   * @returns
   * @memberof ForgotPasswordComponent
   */
  onSubmit() {
    this.submitted = true;

    if (this.forgotForm.invalid) {
      return;
    }

    const email = this.forgotForm.value.email;

    this.loadingLogin = true;
    this.authenticationService.forgot(email).subscribe(
      () => {
        this.loadingLogin = false;
        this.toastr.success('Verifique sua caixa de e-mail', ToastrMessage.SUCESS_SEND_EMAIL, {
          timeOut: 2500,
        });
        setTimeout(() => {
          this.router.navigate(['auth/login']);
        }, 1500);
      },
      () => {
        this.toastr.error('', ToastrMessage.ERROR_SEND_EMAIL, {
          timeOut: 2500,
        });
        this.loadingLogin = false;
      }
    );
  }
}
