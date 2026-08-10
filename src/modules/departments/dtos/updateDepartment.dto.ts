import { PartialType } from "@nestjs/mapped-types";
import { CreateDepartmentsDto } from "./createDepartments.dto";

export class UpdateDepartmentDto extends PartialType(CreateDepartmentsDto) { }