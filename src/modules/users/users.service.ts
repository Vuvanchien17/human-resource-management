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
        try {
            return await this.usersRepo.findOneBy({ email: email });
        } catch (error) {
            console.log('UsersService.findOneByEmail error:', error);
            throw error;
        }
    }

    async findOneById(id: number): Promise<Users | null> {
        try {
            return await this.usersRepo.findOneBy({ id: id })
        } catch (error) {
            console.log('UsersService.findOneById error:', error);
            throw error;
        }
    }

    async findOneByCondition(param): Promise<Users | null> {
        try {
            return await this.usersRepo.findOneBy(param);
        } catch (error) {
            console.log('UsersService.findOneByCondition error:', error);
            throw error;
        }
    }

    async updatePassword(userId: number, newPassword: string): Promise<UpdateResult> {
        try {
            const newPasswordHash = await bcrypt.hash(newPassword, 10);
            return await this.usersRepo.update({ id: userId }, { password: newPasswordHash });
        } catch (error) {
            console.log('UsersService.updatePassword error:', error);
            throw error;
        }
    }
}
