import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeAcceptedStatusLeaves1786208315538 implements MigrationInterface {
    name = 'ChangeAcceptedStatusLeaves1786208315538'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."Leaves_status_enum" RENAME TO "Leaves_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."Leaves_status_enum" AS ENUM('pending', 'rejected', 'accepted')`);
        await queryRunner.query(`ALTER TABLE "Leaves" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Leaves" ALTER COLUMN "status" TYPE "public"."Leaves_status_enum" USING "status"::"text"::"public"."Leaves_status_enum"`);
        await queryRunner.query(`ALTER TABLE "Leaves" ALTER COLUMN "status" SET DEFAULT 'pending'`);
        await queryRunner.query(`DROP TYPE "public"."Leaves_status_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Leaves_status_enum_old" AS ENUM('pending', 'rejected', 'approved')`);
        await queryRunner.query(`ALTER TABLE "Leaves" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Leaves" ALTER COLUMN "status" TYPE "public"."Leaves_status_enum_old" USING "status"::"text"::"public"."Leaves_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "Leaves" ALTER COLUMN "status" SET DEFAULT 'pending'`);
        await queryRunner.query(`DROP TYPE "public"."Leaves_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."Leaves_status_enum_old" RENAME TO "Leaves_status_enum"`);
    }

}
