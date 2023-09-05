import {Component, OnInit} from '@angular/core';
import {Property} from "../shared/models/property";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {PropertyService} from "../shared/services/property.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public properties!: Property[];
  public editProperty!: Property;
  public deleteProperty!: Property;

  constructor(private propertyService: PropertyService) {}

  ngOnInit(): void {
    this.getProperties();
  }

  public getProperties(): void {
    this.propertyService.getProperties().subscribe(
      (response: Property[]) => {
        this.properties = response;
        console.log(this.properties);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddProperty(addForm: NgForm): void {
    // document.getElementById('add-property-form').click();
    this.propertyService.addProperty(addForm.value).subscribe(
      (response: Property) => {
        console.log(response);
        this.getProperties();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateProperty(property: Property): void {
    this.propertyService.updateProperty(property).subscribe(
      (response: Property) => {
        console.log(response);
        this.getProperties();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteProperty(propertyId: number): void {
    this.propertyService.deleteProperty(propertyId).subscribe(
      (response: void) => {
        console.log(response);
        this.getProperties();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchProperties(key: string): void {
    console.log(key);
    const results: Property[] = [];
    for (const employee of this.properties) {
      if (
        employee.address.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        employee.number ||
        employee.district.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        employee.postalCode
      ) {
        results.push(employee);
      }
    }
    this.properties = results;
    if (results.length === 0 || !key) {
      this.getProperties();
    }
  }

  public onOpenModal(property: Property, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addPropertyModal');
    }
    if (mode === 'edit') {
      this.editProperty = property;
      button.setAttribute('data-target', '#updatePropertyModal');
    }
    if (mode === 'delete') {
      this.deleteProperty = property;
      button.setAttribute('data-target', '#deletePropertyModal');
    }
    container?.appendChild(button);
    button.click();
  }

}
