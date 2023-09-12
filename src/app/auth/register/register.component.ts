import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/user';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  fullname: string = '';
  username: string = '';
  password: string = '';
  email: string = '';
  confirmPassword: string = '';
  role: 'tenant' | 'admin' | 'supplier' | '' = '';
  // contract!: number;

  user: User = new User();
  roles: string[];

  constructor(private authService: AuthService, private route: Router) {
    this.roles = ['tenant', 'supplier'];
  }
 

  ngOnInit(): void {
    this.user.fullname = '';
    this.user.username = '';
    this.user.email = '';
    this.user.password = '';
    this.user.confirmPassword = '';
    this.user.role = '';
    this.user.contract;
  }

  signup(f: NgForm) {
    this.user.fullname = f.value.fullname;
    this.user.username = f.value.username;
    this.user.email = f.value.email;
    this.user.password = f.value.password;
    this.user.confirmPassword = f.value.confirmPassword;
    this.user.role = f.value.role;
    this.user.contract;

    this.authService.signUp(this.user).subscribe(
      (res) => {
        if (res == null) {
          alert('Registration failed');
          this.ngOnInit();
        } else {
          console.log('Registration successful');
          alert('Registration successful');
          if (this.role == 'tenant') {
            this.route.navigate(['/tenant']);
          }
          if (this.role == 'supplier') {
            this.route.navigate(['/supplier']);
          }
          // this.route.navigate(['/tenant']);
        }
      },
      (err) => {
        alert('Registration failed.');
        this.ngOnInit();
      }
    );
  }
}
