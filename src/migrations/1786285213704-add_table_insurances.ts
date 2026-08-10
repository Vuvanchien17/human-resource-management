import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTableInsurances1786285213704 implements MigrationInterface {
    name = 'AddTableInsurances1786285213704'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Insurances_status_enum" AS ENUM('active', 'closed')`);
        await queryRunner.query(`CREATE TABLE "Insurances" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "insuranceSalary" numeric(12,2) NOT NULL, "startDate" TIMESTAMP WITH TIME ZONE NOT NULL, "endDate" TIMESTAMP WITH TIME ZONE, "status" "public"."Insurances_status_enum" NOT NULL DEFAULT 'active', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "employeeId" integer NOT NULL, CONSTRAINT "UQ_437e472b8ad5654653df99034af" UNIQUE ("code"), CONSTRAINT "UQ_806752a7899a8ec2ddef4e89140" UNIQUE ("employeeId"), CONSTRAINT "REL_806752a7899a8ec2ddef4e8914" UNIQUE ("employeeId"), CONSTRAINT "PK_9defebeb08b3ba9fddb71a1e9df" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Insurances" ADD CONSTRAINT "FK_806752a7899a8ec2ddef4e89140" FOREIGN KEY ("employeeId") REFERENCES "Employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Insurances" DROP CONSTRAINT "FK_806752a7899a8ec2ddef4e89140"`);
        await queryRunner.query(`DROP TABLE "Insurances"`);
        await queryRunner.query(`DROP TYPE "public"."Insurances_status_enum"`);
    }

}
