import { SetMetadata } from "@nestjs/common";
import { UserRole } from "@/common/enum/role.enum";
import { ROLES_KEY } from "@/common/constants/auth.const";

export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);