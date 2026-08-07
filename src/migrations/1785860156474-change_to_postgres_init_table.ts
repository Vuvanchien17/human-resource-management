import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeToPostgresInitTable1785860156474 implements MigrationInterface {
    name = 'ChangeToPostgresInitTable1785860156474'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Refresh_Tokens" ("id" SERIAL NOT NULL, "value" character varying(500) NOT NULL, "expiredAt" TIMESTAMP WITH TIME ZONE NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "isDeleted" boolean NOT NULL DEFAULT false, "deletedAt" TIMESTAMP, "userId" integer NOT NULL, CONSTRAINT "PK_1b1cc96b5b83a1d0732065c3b95" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Departments" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_bc2db2043c7e4f09f6965b50186" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Employees" ("id" SERIAL NOT NULL, "code" character varying(25) NOT NULL, "fullName" character varying(50) NOT NULL, "joinDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "position" character varying NOT NULL, "salary" integer NOT NULL, "phone" character varying, "gender" "public"."Employees_gender_enum" NOT NULL DEFAULT 'orther', "birth" TIMESTAMP WITH TIME ZONE, "address" character varying(500), "idCard" character varying(15), "userId" integer NOT NULL, "departmentId" integer NOT NULL, CONSTRAINT "UQ_c1de6d61a9f3e905cd430fd9376" UNIQUE ("code"), CONSTRAINT "UQ_358180ee29556b475475dca10b2" UNIQUE ("phone"), CONSTRAINT "UQ_611513dacb730646d715b1593ef" UNIQUE ("idCard"), CONSTRAINT "UQ_26991f337433972a0848d61541d" UNIQUE ("userId"), CONSTRAINT "REL_26991f337433972a0848d61541" UNIQUE ("userId"), CONSTRAINT "PK_42cbd69fa6c59f000fdc0c07bb9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Users" ("id" SERIAL NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(255) NOT NULL, "role" "public"."Users_role_enum" NOT NULL DEFAULT 'employee', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_3c3ab3f49a87e6ddb607f3c4945" UNIQUE ("email"), CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Otps" ("id" SERIAL NOT NULL, "email" character varying(50) NOT NULL, "otpCode" character varying(10) NOT NULL, "expiresAt" TIMESTAMP WITH TIME ZONE NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_a0880c7dbae79114286998debcc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Refresh_Tokens" ADD CONSTRAINT "FK_01fbf0cfe9aa9835fd0b71a19e8" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Employees" ADD CONSTRAINT "FK_26991f337433972a0848d61541d" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Employees" ADD CONSTRAINT "FK_b5f1697d1fb8e0ab1c84a1f34bf" FOREIGN KEY ("departmentId") REFERENCES "Departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Employees" DROP CONSTRAINT "FK_b5f1697d1fb8e0ab1c84a1f34bf"`);
        await queryRunner.query(`ALTER TABLE "Employees" DROP CONSTRAINT "FK_26991f337433972a0848d61541d"`);
        await queryRunner.query(`ALTER TABLE "Refresh_Tokens" DROP CONSTRAINT "FK_01fbf0cfe9aa9835fd0b71a19e8"`);
        await queryRunner.query(`DROP TABLE "Otps"`);
        await queryRunner.query(`DROP TABLE "Users"`);
        await queryRunner.query(`DROP TABLE "Employees"`);
        await queryRunner.query(`DROP TABLE "Departments"`);
        await queryRunner.query(`DROP TABLE "Refresh_Tokens"`);
    }

}
