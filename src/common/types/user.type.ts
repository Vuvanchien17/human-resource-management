import { UserRole } from "../enum/role.enum"

export interface IUserInRequest {
    id: number
    role: UserRole
    employeeId: number
}
