import { Employee } from '@kudu/domain';

export const getEmployeesByUuid = (
  employees: Employee[],
  employeeUuids: string[],
) => {
  return employees.filter((e) => employeeUuids.includes(e.uuid));
};
