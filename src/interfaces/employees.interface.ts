import { CreateEmployeesDto } from "@/modules/employees/dtos/createEmployees.dto";
import { Employees } from "@/modules/employees/entities/employees.entity";

export interface IEmployessService {
    createEmployee(dto: CreateEmployeesDto): Promise<Employees>
}