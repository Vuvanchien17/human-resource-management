import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, DeleteDateColumn } from "typeorm";


@Entity({ name: 'Otps' })
export class Otps {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 50 })
    email: string

    @Column({ length: 10 })
    otpCode: string

    @Column({ type: 'timestamptz' })
    expiresAt: Date

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date

    @DeleteDateColumn({ type: 'timestamptz' })
    deletedAt: Date
}