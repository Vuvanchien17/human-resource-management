import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIsDeletedRFTK1785299778255 implements MigrationInterface {
    name = 'AddIsDeletedRFTK1785299778255'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`refresh_tokens\` ADD \`isDeleted\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`refresh_tokens\` DROP COLUMN \`isDeleted\``);
    }

}
