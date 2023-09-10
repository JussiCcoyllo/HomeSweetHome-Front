import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterComponent } from '../auth/register/register.component';
@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.scss'],
})
export class TenantComponent implements OnInit {
user: any;
  constructor(private route: Router) {}

  ngOnInit(): void {}
  
  logout() {
    localStorage.removeItem('token');
    this.route.navigate(['/']);
  }
}
