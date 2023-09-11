import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Issue } from '../shared/models/issue';
import { IssueService } from '../shared/services/issue.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.scss'],
})
export class TenantComponent implements OnInit {
  user: any;
  public issues!: Issue[];
  public editIssue!: Issue;
  public deleteIssue!: Issue;

  constructor(private route: Router, private issueService: IssueService) {}

  ngOnInit(): void {
    this.getIssues();
  }

  logout() {
    localStorage.removeItem('token');
    this.route.navigate(['/']);
  }
  public getNewIssue(): Issue {
    return {
      id: -1,
      issueName: '',
      issueDate: '',
      issueDescription: '',
    };
  }
  public getIssues(): void {
    this.issueService.getIssues().subscribe(
      (response: Issue[]) => {
        this.issues = response;
        console.log(this.issues);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onAddIssue(addForm: NgForm): void {
    document.getElementById('add-issue-form')?.click();
    this.issueService.addIssue(addForm.value).subscribe(
      (response: Issue) => {
        console.log(response);
        this.getIssues();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }
  public onUpdateIssue(issue: Issue): void {
    issue.id = this.editIssue.id;
    this.issueService.updateIssue(issue).subscribe(
      (response: Issue) => {
        console.log(response);
        this.getIssues();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onDeleteIssue(issueId: number): void {
    this.issueService.deleteIssue(issueId).subscribe(
      (response: void) => {
        console.log(response);
        this.getIssues();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchIssues(key: string): void {
    console.log(key);
    const results: Issue[] = [];
    for (const issue of this.issues) {
      if (
        issue.issueName.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        issue.issueDate.toLowerCase().indexOf(key.toLowerCase()) !== -1 
      ) {
        results.push(issue);
      }
    }
    this.issues = results;
    if (results.length === 0 || !key) {
      this.getIssues();
    }
  }

  public onOpenModal(issue: Issue, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addIssueModal');
    }
    if (mode === 'edit') {
      this.editIssue= issue;
      button.setAttribute('data-target', '#updateIssueModal');
    }
    if (mode === 'delete') {
      this.deleteIssue = issue;
      button.setAttribute('data-target', '#deleteIssueModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
