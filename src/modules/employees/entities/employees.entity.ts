import { Gender } from "@/common/enum/gender.enum";
import { Users } from "@/modules/users/entities/users.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Departments } from "../../departments/entities/departments.entity";

@Entity({ name: 'Employees' })
export class Employees {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 25, unique: true })
    code: string

    @Column({ length: 50 })
    fullName: string

    @CreateDateColumn({ type: 'timestamptz' })
    joinDate: Date

    @Column()
    position: string

    @Column()
    salary: number

    @Column({ unique: true, nullable: true })
    phone?: string

    @Column({ type: 'enum', enum: Gender, default: Gender.ORTHER })
    gender?: Gender

    @Column({ type: 'timestamptz', nullable: true })
    birth?: Date

    @Column({ length: 500, nullable: true })
    address?: string

    @Column({ length: 15, unique: true, nullable: true })
    idCard?: string

    @Column({ unique: true })
    userId: number

    @OneToOne(() => Users, (user) => user.employee)
    @JoinColumn({ name: 'userId' })
    user: Users

    @Column()
    departmentId: number

    @ManyToOne(() => Departments, (department) => department.employees)
    @JoinColumn({ name: 'departmentId' })
    department: Departments
}