import { Employee } from '@octo/domain';

export const getEmployeesByUuid = (
  employees: Employee[],
  employeeUuids: string[],
) => {
  return employees.filter((e) => employeeUuids.includes(e.uuid));
};
