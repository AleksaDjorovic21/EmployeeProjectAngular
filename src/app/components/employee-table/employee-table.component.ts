import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgClass, NgFor } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-table',
  standalone: true,
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css'],
  imports: [CommonModule, NgClass, NgFor]
})

export class EmployeeTableComponent implements OnInit {
  employees: any[] = [];
  error: string | null = null;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.getTimeEntries().subscribe(
      (data: any[]) => {
        console.log('Fetched data:', data); 
        this.employees = this.aggregateData(data);
      },
      (error: any) => {
        console.error('Error fetching employees:', error);
        this.error = 'Error fetching data';
      }
    );
  }

  calculateHours(start: string, end: string): number {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const difference = endDate.getTime() - startDate.getTime();
    return Math.round(difference / (1000 * 60 * 60));
  }

  aggregateData(data: any[]): any[] {
    const employeeMap: { [key: string]: number } = {};
  
    data.forEach(item => {
      if (item.EmployeeName && item.StarTimeUtc && item.EndTimeUtc) {
        const name = item.EmployeeName;
        const hours = this.calculateHours(item.StarTimeUtc, item.EndTimeUtc);
  
        if (employeeMap[name]) {
          employeeMap[name] += hours;
        } else {
          employeeMap[name] = hours;
        }
      }
    });
  
    return Object.keys(employeeMap)
      .map(name => ({ name, totalHours: employeeMap[name] }))
      .sort((a, b) => b.totalHours - a.totalHours);
  }
}
