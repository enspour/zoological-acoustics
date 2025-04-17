import { Pipe, PipeTransform } from '@angular/core';

import { Employee } from '@kudu/domain';

import { getEmployeesByUuid } from '../utils';

@Pipe({
  name: 'getEmployeesByUuid',
})
export class GetEmployeesByUuidPipe implements PipeTransform {
  transform(employees: Employee[], employeeUuids: string[]): Employee[] {
    return getEmployeesByUuid(employees, employeeUuids);
  }
}
