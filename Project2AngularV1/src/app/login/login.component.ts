import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import { User} from '../user';
import { Router } from '@angular/router';
import { Observable } from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserData = {}
  user:User = new User();
  userList;
  authenticated= false;
  directions = 'Decide where to go out to eat- without the fuss of deciding where to go out to eat'

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userList= this.userService.getUserList().subscribe();
    localStorage.clear();
  }

  loginUser(event){

    this.userService.getUserList().subscribe(data => {  
              this.userList = data;
              this.authenticated=false;
              for(let obj of this.userList){
                if(this.user.username==obj.username
                  &&this.user.password==obj.password){
                    this.user=obj;
                    console.log(this.user.location)
                    this.userService.saveUserToSession(this.user);
                    localStorage.setItem('User', JSON.stringify(this.userService.currentUser));
                  
                  this.goToDashUserDashboard()
                  
                }
                else{
                    this.authenticated=true;
                }
    }
    }, error => console.log(error));
  
   
  



}
goToDashUserDashboard(){
   
    this.router.navigate(['/dashboard']);
    

}
}
// save user to user service for other components 