import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNullableLeaves1786204694892 implements MigrationInterface {
    name = 'AddNullableLeaves1786204694892'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Leaves" ALTER COLUMN "approvedById" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Leaves" ALTER COLUMN "approvedById" SET NOT NULL`);
    }

}
