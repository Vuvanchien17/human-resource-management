import { LeaveStatus, LeaveType } from "@/common/enum/leave.enum";
import { Employees } from "@/modules/employees/entities/employees.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'Leaves' })
export class Leaves {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    startDate: Date

    @Column()
    endDate: Date

    @Column({ length: 255 })
    reason: string

    @Column({ type: 'enum', enum: LeaveStatus, default: LeaveStatus.PENDING })
    status: LeaveStatus

    @Column({ type: 'enum', enum: LeaveType, default: LeaveType.PAID })
    type: LeaveType

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date

    @DeleteDateColumn({ type: 'timestamptz' })
    deletedAt: Date

    @Column()
    employeeId: number

    @ManyToOne(() => Employees, employee => employee.requestedLeaves, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'employeeId' })
    employee: Employees

    @Column({ nullable: true })
    approvedById: number

    @ManyToOne(() => Employees, employee => employee.approvedLeaves, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'approvedBy' })
    approvedBy: Employees
}