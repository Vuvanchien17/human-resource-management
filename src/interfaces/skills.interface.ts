import { IUserInRequest } from "@/common/types/user.type";
import { CreateSkillDto } from "@/modules/skills/dtos/createSkill.dto";
import { UpdateSkillDto } from "@/modules/skills/dtos/updateSkill.dto";
import { Skills } from "@/modules/skills/entities/skills.entity";

export interface ISkillsService {
    createSkill(dto: CreateSkillDto, id: number): Promise<Skills>
    updateSkill(dto: UpdateSkillDto, id: number, currentUser: IUserInRequest): Promise<Skills>
    deleteSkill(id: number, currentUser: IUserInRequest): Promise<void>
}