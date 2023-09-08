import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.scss'],
})
export class TenantComponent implements OnInit {
  constructor(private route: Router) {}

  ngOnInit(): void {}
  
  logout() {
    localStorage.removeItem('token');
    this.route.navigate(['/']);
  }
}
