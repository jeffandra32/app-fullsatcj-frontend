import { Component, OnInit } from '@angular/core';
import { pipe, throwError } from 'rxjs';

import { UserDTO } from '../../core/interfaces/user';
import { UserProfileDTO } from 'src/app/core/interfaces/user-profile';
import { UserService } from 'src/app/core/services/user.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userId: string;
  avatar: string;
  title: string;
  github: string;
  linkedin: string;
  bio: string;
  userInfo: UserProfileDTO;

  /**
   * Creates an instance of ProfileComponent.
   * @param {UserService} userService
   * @memberof ProfileComponent
   */
  constructor(private userService: UserService) {}

  ngOnInit() {
    const userInfor: UserProfileDTO = JSON.parse(
      localStorage.getItem('currentUser')
    );
    this.userId = userInfor.id;
    this.getUserById(this.userId);
  }

  /**
   * Retorna informações do usuário logado.
   * @param {string} userId
   * @memberof ProfileComponent
   */
  getUserById(userId: string): void {
    this.userService.getUserById(userId).subscribe(
      (user: UserProfileDTO) => {
        this.userInfo = user[0];
        this.avatar = user[0].avatar;
        this.title = user[0].title;
        this.github = user[0].github;
        this.linkedin = user[0].linkedin;
        this.bio = user[0].bio;
      },
      pipe(
        catchError((error) => {
          return throwError(error);
        })
      )
    );
  }
}
