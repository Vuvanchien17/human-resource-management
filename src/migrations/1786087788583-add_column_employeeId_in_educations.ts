import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnEmployeeIdInEducations1786087788583 implements MigrationInterface {
    name = 'AddColumnEmployeeIdInEducations1786087788583'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Educations" DROP CONSTRAINT "FK_751d067296cb28d5c80958a1f42"`);
        await queryRunner.query(`ALTER TABLE "Educations" ALTER COLUMN "employeeId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Educations" ADD CONSTRAINT "FK_751d067296cb28d5c80958a1f42" FOREIGN KEY ("employeeId") REFERENCES "Employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Educations" DROP CONSTRAINT "FK_751d067296cb28d5c80958a1f42"`);
        await queryRunner.query(`ALTER TABLE "Educations" ALTER COLUMN "employeeId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Educations" ADD CONSTRAINT "FK_751d067296cb28d5c80958a1f42" FOREIGN KEY ("employeeId") REFERENCES "Employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
