import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Solution } from '../shared/models/solution';
import { SolutionService } from '../shared/services/solution.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss'],
})
export class SupplierComponent implements OnInit {
  public solutions!: Solution[];
  public editSolution!: Solution;
  public deleteSolution!: Solution;

  constructor(
    private solutionService: SolutionService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.getSolutions();
  }

  logout(): void {
    localStorage.removeItem('token');
    this.route.navigate(['/']);
  }
  public getNewSolution(): Solution {
    return {
      id: -1,
      status: '',
      descriptionSolution: '',
    };
  }
  public getSolutions(): void {
    this.solutionService.getSolutions().subscribe(
      (response: Solution[]) => {
        this.solutions = response;
        console.log(this.solutions);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddSolution(addForm: NgForm): void {
    document.getElementById('add-solution-form')?.click();
    this.solutionService.addSolution(addForm.value).subscribe(
      (response: Solution) => {
        console.log(response);
        this.getSolutions();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateSolution(solution: Solution): void {
    this.solutionService.updateSolution(solution).subscribe(
      (response: Solution) => {
        console.log(response);
        this.getSolutions();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteSolution(solutionId: number): void {
    this.solutionService.deleteSolution(solutionId).subscribe(
      (response: void) => {
        console.log(response);
        this.getSolutions();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchSolutions(key: string): void {
    console.log(key);
    const results: Solution[] = [];
    for (const solution of this.solutions) {
      if (
        solution.status.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        solution.descriptionSolution
          .toLowerCase()
          .indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(solution);
      }
    }
    this.solutions = results;
    if (results.length === 0 || !key) {
      this.getSolutions();
    }
  }

  public onOpenModal(solution: Solution, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addSolutionModal');
    }
    if (mode === 'edit') {
      this.editSolution = solution;
      button.setAttribute('data-target', '#updateSolutionModal');
    }
    if (mode === 'delete') {
      this.deleteSolution = solution;
      button.setAttribute('data-target', '#deleteSolutionModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
