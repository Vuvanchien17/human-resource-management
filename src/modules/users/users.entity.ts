
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { RefreshTokens } from "../auth/entities/refresh-token.entity";
import { UserRole } from "@/common/enum/role.enum";

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 50, type: 'varchar', unique: true })
    email: string

    @Column({ length: 255, type: 'varchar' })
    password: string

    @Column({ type: 'enum', enum: UserRole, default: UserRole.EMPLOYEE })
    role: UserRole

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    updatedAt!: Date

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deletedAt!: Date

    @Column({ type: 'boolean', default: true })
    isActive: boolean

    @OneToMany(() => RefreshTokens, (refreshToken) => refreshToken.user)
    refreshTokens: RefreshTokens[]
}