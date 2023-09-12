import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../shared/models/user';
import { AuthService } from '../../shared/services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  role: 'tenant' | 'supplier' | 'admin' | '' = '';

  user: User = new User();

  roles: string[];

  constructor(private authService: AuthService, private route: Router) {
    this.roles = ['admin', 'supplier', 'tenant'];
  }

  ngOnInit(): void {
    this.username = '';
    this.password = '';
    this.role='';
  }

  login(f: NgForm) {
    if(!f.valid) {return;}
    this.user.username = f.value.username;
    this.user.password = f.value.password;
    this.user.role = f.value.role;

    console.log(JSON.stringify(this.user))

    this.authService.login(this.user).subscribe(
      (res) => {
        if (res == null) {
          alert('Username or password is wrong');
          this.ngOnInit();
        } else {
          console.log('Login successful');
          localStorage.setItem('token', res.token);

          if (res.role == 'tenant') {
            this.route.navigate(['/tenant']);
          }
          if (res.role == 'supplier') {
            this.route.navigate(['/supplier']);
          }
          if (res.role == 'admin') {
            this.route.navigate(['/admin']);
          }
        }
      },
      (err) => {
        alert('Login failed');
        this.ngOnInit();
      }
    );
  }
}
