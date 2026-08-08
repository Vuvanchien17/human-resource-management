import { Degree } from "@/common/enum/degree.enum";
import { Employees } from "@/modules/employees/entities/employees.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Educations" })
export class Educations {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 100 })
    schoolName: string

    @Column({ length: 200 })
    fieldStudy: string

    @Column({ type: 'enum', enum: Degree, default: Degree.OTHER })
    degree: Degree

    @Column()
    startYear: number

    @Column()
    endYear: number

    @DeleteDateColumn({ type: 'timestamptz' })
    deletedAt: Date

    @Column()
    employeeId: number

    @ManyToOne(() => Employees, employee => employee.educations)
    @JoinColumn({ name: 'employeeId' })
    employee: Employees

}