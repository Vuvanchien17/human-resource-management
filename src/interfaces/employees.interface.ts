import { CreateEmployeesDto } from "@/modules/employees/dtos/createEmployees.dto";
import { Employees } from "@/modules/employees/entities/employees.entity";

export interface IEmployeesService {
    findOneById(id: number): Promise<Employees>
    findOneByUserId(id: number): Promise<Employees>
    createEmployee(dto: CreateEmployeesDto): Promise<Employees>
}