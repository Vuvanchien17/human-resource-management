import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIsActiveEmployees1786293645542 implements MigrationInterface {
    name = 'AddIsActiveEmployees1786293645542'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Employees" ADD "isActive" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Employees" DROP COLUMN "isActive"`);
    }

}
