import { DataSource } from 'typeorm';
import { join } from 'path';
import { Users } from '@/modules/users/entities/users.entity';
import { RefreshTokens } from '@/modules/auth/entities/refresh-token.entity';
import { Otps } from '@/modules/auth/entities/otps.entity';
import { Employees } from '@/modules/employees/entities/employees.entity';
import { Departments } from '@/modules/departments/entities/departments.entity';
import { Educations } from '@/modules/educations/entities/educations.entity';


import { Skills } from '@/modules/skills/entities/skills.entity';
import { Leaves } from '@/modules/leaves/entities/leaves.entity';
import { Attendances } from '@/modules/attendances/entities/attendances.entity';
import { Insurances } from '@/modules/insurances/entities/insurances.entity';
import { Payrolls } from '@/modules/payrolls/entities/payrolls.entity';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'Vuvanchien2005',
    database: 'human_resource_management',
    entities: [Users, RefreshTokens, Otps, Employees, Departments, Educations, Skills, Leaves, Attendances, Insurances, Payrolls],
    migrations: [join(__dirname, '../migrations/*{.ts,.js}')],
    synchronize: false,
});