import { Component } from '@angular/core';
import { EmployeeTableComponent } from './components/employee-table/employee-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [EmployeeTableComponent]  // Correctly import EmployeeTableComponent here
})
export class AppComponent {
  title = 'Employee Project';
}
