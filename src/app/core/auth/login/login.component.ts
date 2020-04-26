import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from 'src/app/core/services/auth.service';
import { CredenciaisDTO } from './../../interfaces/credenciais';
import { ToastrMessage } from 'src/app/core/enums/toastr';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  loadingLogin: boolean;
  creds: CredenciaisDTO = {
    email: '',
    password: '',
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
  ) {
    this.loadingLogin = false;
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/admin';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  /**
   * Envia credenciais para o serviço
   * @returns
   * @memberof LoginComponent
   */
  onLogin() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.creds = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.loadingLogin = true;
    this.authenticationService.login(this.creds).subscribe(
      (res: any) => {
        this.loadingLogin = false;
        this.toastr.success(ToastrMessage.SUCESS_AUTH, 'Seja Bem vindo!', {
          timeOut: 1500,
        });

        this.router.navigate([this.returnUrl]);
      },
      (error: { status: number }) => {
        if (error.status === 401) {
          this.toastr.error('Email ou senha incorretos!', 'Falha');
        } else {
          this.toastr.error('Email ou senha incorretos!', '');
        }
        this.loadingLogin = false;
      }
    );
  }
}
