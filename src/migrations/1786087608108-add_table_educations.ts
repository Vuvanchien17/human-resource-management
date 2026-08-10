import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTableEducations1786087608108 implements MigrationInterface {
    name = 'AddTableEducations1786087608108'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Educations_degree_enum" AS ENUM('Cử Nhân', 'Kỹ Sư', 'Thạc Sỹ', 'Tiến Sy', 'Giáo Sư', 'Khác')`);
        await queryRunner.query(`CREATE TABLE "Educations" ("id" SERIAL NOT NULL, "schoolName" character varying(100) NOT NULL, "fieldStudy" character varying(200) NOT NULL, "degree" "public"."Educations_degree_enum" NOT NULL DEFAULT 'Khác', "startYear" integer NOT NULL, "endYear" integer NOT NULL, "deletedAt" TIMESTAMP, "employeeId" integer, CONSTRAINT "PK_b51f688a135a51769d49ea1779d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Educations" ADD CONSTRAINT "FK_751d067296cb28d5c80958a1f42" FOREIGN KEY ("employeeId") REFERENCES "Employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Educations" DROP CONSTRAINT "FK_751d067296cb28d5c80958a1f42"`);
        await queryRunner.query(`DROP TABLE "Educations"`);
        await queryRunner.query(`DROP TYPE "public"."Educations_degree_enum"`);
    }

}
