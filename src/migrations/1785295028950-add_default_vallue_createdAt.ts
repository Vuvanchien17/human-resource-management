import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDefaultVallueCreatedAt1785295028950 implements MigrationInterface {
    name = 'AddDefaultVallueCreatedAt1785295028950'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`refresh_tokens\` CHANGE \`createdAt\` \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`isActive\` \`isActive\` tinyint NOT NULL DEFAULT 1`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`isActive\` \`isActive\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`refresh_tokens\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL`);
    }

}
