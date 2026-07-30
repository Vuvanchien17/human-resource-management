import { AppDataSource } from '@/config/typeorm.config';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


@Global()
@Module({
    imports: [TypeOrmModule.forRootAsync({
        useFactory: () => AppDataSource.options,
    })],
    exports: [TypeOrmModule]
})
export class DatabaseModule { }
