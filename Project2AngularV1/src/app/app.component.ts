import { Component } from '@angular/core';
import {FriendService} from './friend.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FriendService]
})
export class AppComponent {
  title = 'Tastease';
 
}
