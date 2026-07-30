import { Users } from "@/modules/users/users.entity";
import { timestamp } from "rxjs";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RefreshTokens {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 500 })
    value: string

    @Column({ type: 'timestamp' })
    expiredAt: Date

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date

    @Column({ default: false })
    isDeleted: boolean

    @DeleteDateColumn()
    deletedAt: Date

    @ManyToOne(() => Users, (user) => user.refreshTokens)
    user: Users
}