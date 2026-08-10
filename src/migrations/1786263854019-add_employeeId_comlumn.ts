import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEmployeeIdComlumn1786263854019 implements MigrationInterface {
    name = 'AddEmployeeIdComlumn1786263854019'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Attendances" DROP CONSTRAINT "FK_c039cab387ad3a1d6b96ad2e2fe"`);
        await queryRunner.query(`ALTER TABLE "Attendances" DROP CONSTRAINT "UQ_EMPLOYEE_DATE"`);
        await queryRunner.query(`ALTER TABLE "Attendances" ALTER COLUMN "employeeId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Attendances" ADD CONSTRAINT "UQ_EMPLOYEE_DATE" UNIQUE ("employeeId", "date")`);
        await queryRunner.query(`ALTER TABLE "Attendances" ADD CONSTRAINT "FK_c039cab387ad3a1d6b96ad2e2fe" FOREIGN KEY ("employeeId") REFERENCES "Employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Attendances" DROP CONSTRAINT "FK_c039cab387ad3a1d6b96ad2e2fe"`);
        await queryRunner.query(`ALTER TABLE "Attendances" DROP CONSTRAINT "UQ_EMPLOYEE_DATE"`);
        await queryRunner.query(`ALTER TABLE "Attendances" ALTER COLUMN "employeeId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Attendances" ADD CONSTRAINT "UQ_EMPLOYEE_DATE" UNIQUE ("date", "employeeId")`);
        await queryRunner.query(`ALTER TABLE "Attendances" ADD CONSTRAINT "FK_c039cab387ad3a1d6b96ad2e2fe" FOREIGN KEY ("employeeId") REFERENCES "Employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
