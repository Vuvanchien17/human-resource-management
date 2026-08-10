import { IUserInRequest } from "@/common/types/user.type";
import { CreateEmployeesDto } from "@/modules/employees/dtos/createEmployees.dto";
import { UpdateEmployeeDto } from "@/modules/employees/dtos/updateEmployee.dto";
import { Employees } from "@/modules/employees/entities/employees.entity";

export interface IEmployeesService {
    findOneById(id: number): Promise<Employees>;
    findOneByUserId(id: number): Promise<Employees>;
    createEmployee(dto: CreateEmployeesDto): Promise<Employees>;
    getListEmployeesByDepartmentId(id: number, currentUser: IUserInRequest): Promise<Employees[]>;
    getDetailEmployeeById(id: number, currentUser: IUserInRequest): Promise<Employees>;
    updateEmployee(dto: UpdateEmployeeDto, employeeId: number, currentUser: IUserInRequest): Promise<Employees>;
}