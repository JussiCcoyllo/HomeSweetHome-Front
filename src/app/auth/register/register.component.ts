import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  fullname: string = '';
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  role: string = '';
  contract!: number;

  user: User = new User();
  roles: string[];

  constructor(private authService: AuthService, private route: Router) {
    this.roles = ['Tenant', 'Supplier'];
  }

  ngOnInit(): void {
    this.user.username = '';
    this.user.password = '';
    this.user.confirmPassword = '';
    this.user.fullname = '';
    this.user.role = '';
  }

  signup() {
    this.user.username = this.username;
    this.user.password = this.password;
    this.user.fullname = this.fullname;
    this.user.role = 'user';

    this.authService.signUp(this.user).subscribe(
      (res) => {
        if (res == null) {
          alert('Registration failed');
          this.ngOnInit();
        } else {
          console.log('Registration successful');
          alert('Registration successful');
          this.route.navigate(['/']);
        }
      },
      (err) => {
        alert('Registration failed.');
        this.ngOnInit();
      }
    );
  }
}
