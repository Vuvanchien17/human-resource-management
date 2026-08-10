import { Employees } from "@/modules/employees/entities/employees.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({ name: 'Payrolls' })
@Unique('UQ_PAYROLL_MONTH_YEAR', ['employee', 'month', 'year'])
export class Payrolls {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    month: number

    @Column()
    year: number

    @Column()
    actualWorkDays: number

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    netSalary: number

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date

    @Column()
    employeeId: number

    @ManyToOne(() => Employees, employee => employee.payrolls)
    employee: Employees

}