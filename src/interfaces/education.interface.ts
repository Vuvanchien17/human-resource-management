import { UserRole } from "@/common/enum/role.enum";
import { IUserInRequest } from "@/common/types/user.type";
import { CreateEducationsDto } from "@/modules/educations/dtos/createEducations.dto";
import { UpdateEducationDto } from "@/modules/educations/dtos/updateEducation.dto";
import { Educations } from "@/modules/educations/entities/educations.entity";
import { Users } from "@/modules/users/entities/users.entity";

export interface IEducationsService {
    createEducation(dto: CreateEducationsDto, id: number): Promise<Educations>;
    updateEducation(dto: UpdateEducationDto, id: number, currentUser: IUserInRequest): Promise<Educations>;
    deleteEducation(id: number, currentUser: IUserInRequest): Promise<void>;
}