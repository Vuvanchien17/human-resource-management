import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(Users) private readonly usersRepo: Repository<Users>) { }

    async findOneByEmail(email: string): Promise<Users | null> {
        return await this.usersRepo.findOne({ where: { email: email } });
    }

    async findOneById(id: number): Promise<Users | null> {
        return await this.usersRepo.findOne({ where: { id: id } })
    }

    // async create(dto: CreateUserDto): Promise<Users> {
    //     return await this.usersRepo.save(dto);
    // }
}
