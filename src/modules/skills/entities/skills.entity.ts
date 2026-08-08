import { Employees } from "@/modules/employees/entities/employees.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'Skills' })
export class Skills {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 150 })
    name: string

    @Column({ length: 100 })
    level: string

    @DeleteDateColumn({ type: 'timestamptz' })
    deletedAt: Date

    @Column()
    employeeId: number

    @ManyToOne(() => Employees, employee => employee.skills)
    @JoinColumn({ name: 'employeeId' })
    employee: Employees
}