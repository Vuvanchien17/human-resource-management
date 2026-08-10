import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateResult } from 'typeorm/browser';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(Users) private readonly usersRepo: Repository<Users>) { }

    async findOneByEmail(email: string): Promise<Users | null> {
        return await this.usersRepo.findOneBy({ email: email });
    }

    async findOneById(id: number): Promise<Users | null> {
        return await this.usersRepo.findOneBy({ id: id })
    }

    async updatePassword(userId: number, newPassword: string): Promise<UpdateResult> {
        const newPasswordHash = await bcrypt.hash(newPassword, 10);
        return await this.usersRepo.update({ id: userId }, { password: newPasswordHash });
    }
}
