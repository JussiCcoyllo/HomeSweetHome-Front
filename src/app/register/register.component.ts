import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../shared/services/register.service';
import { User } from '../shared/models/user';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  user: User = new User();

  constructor(private registerService: RegisterService) {}

  ngOnInit(): void {}

  userRegister() {
    console.log(this.user);
    this.registerService.registerUser(this.user).subscribe(
      (data) => {
        alert('Successfully Register User');
      },
      (error) => alert('Sorry User not register')
    );
  }

 
}

