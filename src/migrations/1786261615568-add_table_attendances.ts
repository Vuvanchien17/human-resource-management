import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTableAttendances1786261615568 implements MigrationInterface {
    name = 'AddTableAttendances1786261615568'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Attendances_status_enum" AS ENUM('Đi làm', 'Vắng mặt', 'Đi muộn', 'Khác')`);
        await queryRunner.query(`CREATE TABLE "Attendances" ("id" SERIAL NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "checkIn" TIMESTAMP WITH TIME ZONE NOT NULL, "checkOut" TIMESTAMP WITH TIME ZONE NOT NULL, "status" "public"."Attendances_status_enum" NOT NULL DEFAULT 'Khác', "employeeId" integer, CONSTRAINT "UQ_EMPLOYEE_DATE" UNIQUE ("employeeId", "date"), CONSTRAINT "PK_95d2bbe195bb697b84bae415391" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Attendances" ADD CONSTRAINT "FK_c039cab387ad3a1d6b96ad2e2fe" FOREIGN KEY ("employeeId") REFERENCES "Employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Attendances" DROP CONSTRAINT "FK_c039cab387ad3a1d6b96ad2e2fe"`);
        await queryRunner.query(`DROP TABLE "Attendances"`);
        await queryRunner.query(`DROP TYPE "public"."Attendances_status_enum"`);
    }

}
