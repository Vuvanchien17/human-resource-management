import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTableSkills1786200407801 implements MigrationInterface {
    name = 'AddTableSkills1786200407801'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Skills" ("id" SERIAL NOT NULL, "name" character varying(150) NOT NULL, "level" character varying(100) NOT NULL, "deletedAt" TIMESTAMP WITH TIME ZONE, "employeeId" integer NOT NULL, CONSTRAINT "PK_2f371d611f4a29288e11c9b628e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Skills" ADD CONSTRAINT "FK_1f2dbbc4f4d57cd4a622dd33b29" FOREIGN KEY ("employeeId") REFERENCES "Employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Skills" DROP CONSTRAINT "FK_1f2dbbc4f4d57cd4a622dd33b29"`);
        await queryRunner.query(`DROP TABLE "Skills"`);
    }

}
