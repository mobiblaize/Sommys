import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnChanges {
  @Input() post: Post;
  imgIndex = 0;
  constructor() { }

  ngOnInit(): void { }

  ngOnChanges(): void { 
    this.imgIndex = 0;
  }

  previousImage() {
    this.imgIndex -= 1;
  }

  nextImage() {
    this.imgIndex += 1;
  }

}
