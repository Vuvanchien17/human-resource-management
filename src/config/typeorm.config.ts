import { DataSource } from 'typeorm';
import { join } from 'path';
import { Users } from '@/modules/users/users.entity';
import { RefreshTokens } from '@/modules/auth/entities/refresh-token.entity';
import { Otps } from '@/modules/auth/entities/otps.entity';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'human_resource_management',
    entities: [Users, RefreshTokens, Otps],
    migrations: [join(__dirname, '../migrations/*{.ts,.js}')],
    synchronize: false,
});