import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { Users } from '@/modules/users/entities/users.entity';
import { UserRole } from '@/common/enum/role.enum';
import { Employees } from '@/modules/employees/entities/employees.entity';


@Injectable()
export class SeederService implements OnApplicationBootstrap {
    constructor(
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>,
        @InjectRepository(Employees)
        private readonly employeeRepo: Repository<Employees>,
    ) { }

    async onApplicationBootstrap() {
        await this.seedUsers();
    }

    public async seedUsers() {
        const adminExists = await this.userRepository.findOneBy({ email: 'hieungo20052808@gmail.com' });

        if (!adminExists) {
            const hashedPassword = await bcrypt.hash('Vuvanchien2005', 10);
            await this.userRepository.save({
                email: 'hieungo20052808@gmail.com',
                password: hashedPassword,
                role: UserRole.ADMIN,
            });
            console.log('✅ Seeded default admin user!');
        }

        // await this.employeeRepo.save({
        //     fullName: "Vuvanchien",
        //     position: "admin_system",
        //     salary: 1000000,
        //     departmentId: 1,
        //     userId: 1,
        //     code: "NV0002"
        // })

    }
}