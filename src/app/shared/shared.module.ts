import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { EditPerfilComponent } from './components/edit-perfil/edit-perfil.component';
import { FeedSharedNewsComponent } from './components/feed-shared-news/feed-shared-news.component';
import { LoadingComponent } from './loading/loading.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { RecentPostComponent } from './components/recent-post/recent-post.component';

@NgModule({
  declarations: [
    LoadingComponent,
    FeedSharedNewsComponent,
    CreatePostComponent,
    RecentPostComponent,
    EditPerfilComponent,
  ],
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    LoadingComponent,
    FeedSharedNewsComponent,
    CreatePostComponent,
    RecentPostComponent,
    EditPerfilComponent,
  ],
})
export class SharedModule {}
