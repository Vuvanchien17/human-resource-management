import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, DeleteDateColumn } from "typeorm";


@Entity()
export class Otps {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 50 })
    email: string

    @Column({ length: 10 })
    otpCode: string

    @Column({ type: 'timestamp' })
    expiresAt: Date

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date

    @DeleteDateColumn({ type: 'timestamp' })
    deletedAt: Date
}