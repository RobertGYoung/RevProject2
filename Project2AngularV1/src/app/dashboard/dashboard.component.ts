import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User} from '../user';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import {LoginComponent} from '../login/login.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
   currentUser= new User();
  
  constructor(private userService : UserService, private http: HttpClient, private route : ActivatedRoute) {
    
  }
 
  ngOnInit(): void {
    this.route.paramMap
      .subscribe(params => {

        this.currentUser= this.userService.showUserInSession();
        // this.currentUser.username=params.get('username');
        // this.currentUser.id=parseInt(params.get('id'));
       

      });
      }

      
    }
  
  
  

