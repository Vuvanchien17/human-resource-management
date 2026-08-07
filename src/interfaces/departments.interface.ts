import { CreateDepartmentsDto } from "@/modules/departments/dtos/createDepartments.dto";
import { UpdateDepartmentDto } from "@/modules/departments/dtos/updateDepartment.dto";
import { Departments } from "@/modules/departments/entities/departments.entity";

export interface IDepartmentsService {
    createDepartment(dto: CreateDepartmentsDto): Promise<Departments>
    updateDeparment(dto: UpdateDepartmentDto, id: number): Promise<Departments>
    deleteDepartment(id: number): Promise<void>
}