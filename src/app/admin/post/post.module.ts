import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsComponent } from '../post/posts/posts.component';
import { PostRoutingModule } from './post-routing.module';
import { EditPostComponent } from './edit-post/edit-post.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PostsComponent,
    EditPostComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PostRoutingModule
  ]
})
export class PostModule { }
