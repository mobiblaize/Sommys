import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../../models/message.model';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {

  constructor() { }
  @Input() message:Message;
  
  ngOnInit(): void {
  }

}
