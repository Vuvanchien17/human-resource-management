import { AttendanceStatus } from "@/common/enum/attendance.enum";
import { Employees } from "@/modules/employees/entities/employees.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({ name: 'Attendances' })
@Unique('UQ_EMPLOYEE_DATE', ['employee', 'date'])
export class Attendances {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'timestamptz' })
    date: Date

    @Column({ type: 'timestamptz' })
    checkIn: Date

    @Column({ type: 'timestamptz', nullable: true })
    checkOut: Date

    @Column({ type: 'enum', enum: AttendanceStatus, default: AttendanceStatus.ORTHER })
    status: AttendanceStatus

    @Column()
    employeeId: number

    @ManyToOne(() => Employees, employee => employee.attendances)
    @JoinColumn({ name: 'employeeId' })
    employee: Employees
}