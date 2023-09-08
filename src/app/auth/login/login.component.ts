import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../shared/models/user';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  role: string = '';

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

  login() {
    this.user.username = this.username;
    this.user.password = this.password;
    this.user.role = this.role;

    this.authService.login(this.user).subscribe(
      (res) => {
        if (res == null) {
          alert('Username or password is wrong');
          this.ngOnInit();
        } else {
          console.log('Login successful');
          localStorage.setItem('token', res.token);

          if (this.role == 'tenant') {
            this.route.navigate(['/tenant']);
          }
          if (this.role == 'supplier') {
            this.route.navigate(['/supplier']);
          }
          if (this.role == 'admin') {
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
