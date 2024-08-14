import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-pie-chart',
  standalone: true,
  templateUrl: './employee-pie-chart.component.html',
  styleUrls: ['./employee-pie-chart.component.css'],
  imports: [NgxChartsModule]
})
export class EmployeePieChartComponent implements OnInit {
  public pieChartData: any[] = [];
  public pieChartLabels: string[] = [];
  
  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.getTimeEntries().subscribe(data => {
      this.processData(data);
    });
  }

  private processData(data: any[]): void {
    const totalHoursByEmployee: { [key: string]: number } = {};

    data.forEach(entry => {
      const employeeName = entry.EmployeeName;
      const hoursWorked = this.calculateHoursWorked(entry);

      if (totalHoursByEmployee[employeeName]) {
        totalHoursByEmployee[employeeName] += hoursWorked;
      } else {
        totalHoursByEmployee[employeeName] = hoursWorked;
      }
    });

    this.pieChartData = Object.keys(totalHoursByEmployee).map(name => ({
      name,
      value: totalHoursByEmployee[name]
    }));
  }

  private calculateHoursWorked(entry: any): number {
    const start = new Date(entry.StarTimeUtc);
    const end = new Date(entry.EndTimeUtc);
    const diff = end.getTime() - start.getTime();
    return diff / (1000 * 60 * 60);
  }
}

