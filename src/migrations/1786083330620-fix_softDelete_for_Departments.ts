import { MigrationInterface, QueryRunner } from "typeorm";

export class FixSoftDeleteForDepartments1786083330620 implements MigrationInterface {
    name = 'FixSoftDeleteForDepartments1786083330620'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Departments" ADD "deletedAt" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Departments" DROP COLUMN "deletedAt"`);
    }

}
