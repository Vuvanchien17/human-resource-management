import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTablePayrolls1786290629449 implements MigrationInterface {
    name = 'AddTablePayrolls1786290629449'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Payrolls" ("id" SERIAL NOT NULL, "month" integer NOT NULL, "year" integer NOT NULL, "actualWorkDays" integer NOT NULL, "netSalary" numeric(12,2) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "employeeId" integer NOT NULL, CONSTRAINT "UQ_PAYROLL_MONTH_YEAR" UNIQUE ("employeeId", "month", "year"), CONSTRAINT "PK_944fe38706b9a1558687a77e782" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Payrolls" ADD CONSTRAINT "FK_0786b86e013d2ae7a61f81197fc" FOREIGN KEY ("employeeId") REFERENCES "Employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Payrolls" DROP CONSTRAINT "FK_0786b86e013d2ae7a61f81197fc"`);
        await queryRunner.query(`DROP TABLE "Payrolls"`);
    }

}
