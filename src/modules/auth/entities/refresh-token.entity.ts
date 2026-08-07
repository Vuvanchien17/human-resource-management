import { Users } from "@/modules/users/entities/users.entity";
import { timestamp } from "rxjs";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'Refresh_Tokens' })
export class RefreshTokens {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 500, name: "value" })
    value: string

    @Column({ type: 'timestamptz' })
    expiredAt: Date

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date

    @Column({ default: false })
    isDeleted: boolean

    @DeleteDateColumn()
    deletedAt: Date

    @Column()
    userId: number

    @ManyToOne(() => Users, (user) => user.refreshTokens)
    @JoinColumn({ name: 'userId' })
    user: Users
}