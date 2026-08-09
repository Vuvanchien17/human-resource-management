import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTableLeaves1786203714978 implements MigrationInterface {
    name = 'AddTableLeaves1786203714978'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Leaves_status_enum" AS ENUM('pending', 'rejected', 'approved')`);
        await queryRunner.query(`CREATE TYPE "public"."Leaves_type_enum" AS ENUM('paid', 'unpaid')`);
        await queryRunner.query(`CREATE TABLE "Leaves" ("id" SERIAL NOT NULL, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, "reason" character varying(255) NOT NULL, "status" "public"."Leaves_status_enum" NOT NULL DEFAULT 'pending', "type" "public"."Leaves_type_enum" NOT NULL DEFAULT 'paid', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "employeeId" integer NOT NULL, "approvedById" integer NOT NULL, "approvedBy" integer, CONSTRAINT "PK_fbd6a377f9db0b59cd7fc957019" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Leaves" ADD CONSTRAINT "FK_6f8acbca83370de7ec829e4a72a" FOREIGN KEY ("employeeId") REFERENCES "Employees"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Leaves" ADD CONSTRAINT "FK_942d6e57e371bb14d2a8c7a96b4" FOREIGN KEY ("approvedBy") REFERENCES "Employees"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Leaves" DROP CONSTRAINT "FK_942d6e57e371bb14d2a8c7a96b4"`);
        await queryRunner.query(`ALTER TABLE "Leaves" DROP CONSTRAINT "FK_6f8acbca83370de7ec829e4a72a"`);
        await queryRunner.query(`DROP TABLE "Leaves"`);
        await queryRunner.query(`DROP TYPE "public"."Leaves_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."Leaves_status_enum"`);
    }

}
