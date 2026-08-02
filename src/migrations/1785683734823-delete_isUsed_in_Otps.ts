import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteIsUsedInOtps1785683734823 implements MigrationInterface {
    name = 'DeleteIsUsedInOtps1785683734823'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`otps\` DROP COLUMN \`isUsed\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`otps\` ADD \`isUsed\` tinyint NOT NULL DEFAULT '0'`);
    }

}
