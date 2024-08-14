import { Component } from '@angular/core';
import { EmployeeTableComponent } from './components/employee-table/employee-table.component';
import { EmployeePieChartComponent } from './components/employee-pie-chart/employee-pie-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [EmployeeTableComponent, EmployeePieChartComponent, NgxChartsModule] 
})
export class AppComponent {
  title = 'Employee Project';
}
