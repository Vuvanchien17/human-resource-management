import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSoftDeleteColumnRFTK1785300399470 implements MigrationInterface {
    name = 'AddSoftDeleteColumnRFTK1785300399470'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`refresh_tokens\` ADD \`deletedAt\` datetime(6) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`refresh_tokens\` DROP COLUMN \`deletedAt\``);
    }

}
