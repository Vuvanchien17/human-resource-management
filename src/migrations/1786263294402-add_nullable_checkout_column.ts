import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNullableCheckoutColumn1786263294402 implements MigrationInterface {
    name = 'AddNullableCheckoutColumn1786263294402'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Attendances" ALTER COLUMN "checkOut" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Attendances" ALTER COLUMN "checkOut" SET NOT NULL`);
    }

}
