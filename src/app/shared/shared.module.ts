import { CommonModule } from '@angular/common';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { FeedSharedNewsComponent } from './components/feed-shared-news/feed-shared-news.component';
import { LoadingComponent } from './loading/loading.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RecentPostComponent } from './components/recent-post/recent-post.component';

@NgModule({
  declarations: [
    LoadingComponent,
    FeedSharedNewsComponent,
    CreatePostComponent,
    RecentPostComponent,
  ],
  imports: [CommonModule,  ModalModule.forRoot(), NgSelectModule],
  exports: [
    LoadingComponent,
    FeedSharedNewsComponent,
    CreatePostComponent,
    RecentPostComponent,
  ],
})
export class SharedModule {}
