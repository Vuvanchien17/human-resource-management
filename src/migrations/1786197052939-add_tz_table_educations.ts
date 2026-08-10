import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTzTableEducations1786197052939 implements MigrationInterface {
    name = 'AddTzTableEducations1786197052939'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Educations" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "Educations" ADD "deletedAt" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Educations" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "Educations" ADD "deletedAt" TIMESTAMP`);
    }

}
