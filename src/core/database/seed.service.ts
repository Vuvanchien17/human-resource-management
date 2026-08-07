import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { Users } from '@/modules/users/entities/users.entity';
import { UserRole } from '@/common/enum/role.enum';


@Injectable()
export class SeederService implements OnApplicationBootstrap {
    constructor(
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>,
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
    }
}