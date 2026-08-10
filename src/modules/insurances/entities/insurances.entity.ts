import { InsuranceStatus } from "@/common/enum/insurances.enum";
import { Employees } from "@/modules/employees/entities/employees.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { JoinAttribute } from "typeorm/query-builder/JoinAttribute.js";

@Entity({ name: 'Insurances' })
export class Insurances {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    code: string

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    insuranceSalary: number;

    @Column({ type: 'timestamptz' })
    startDate: Date

    @Column({ type: 'timestamptz', nullable: true })
    endDate?: Date

    @Column({ type: 'enum', enum: InsuranceStatus, default: InsuranceStatus.ACTIVE })
    status: InsuranceStatus

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date

    @DeleteDateColumn({ type: 'timestamptz' })
    deletedAt: Date

    @Column({ unique: true })
    employeeId: number

    @OneToOne(() => Employees, employee => employee.insurance)
    @JoinColumn({ name: 'employeeId' })
    employee: Employees
}