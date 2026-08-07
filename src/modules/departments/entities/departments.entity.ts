import { Entity, PrimaryGeneratedColumn, Column, OneToMany, DeleteDateColumn } from "typeorm";
import { Employees } from "../../employees/entities/employees.entity";

@Entity({ name: 'Departments' })
export class Departments {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 50 })
    name: string

    @Column()
    description: string

    @DeleteDateColumn({ type: 'timestamptz' })
    deletedAt: Date

    @OneToMany(() => Employees, employee => employee.department)
    employees: Employees[]
}
