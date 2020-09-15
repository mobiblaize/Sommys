import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
    <h3 style="height: 100vh; font-size: 150%; padding: 2%;">
      Page not found
    </h3>
  `,
  styles: [  ]
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
