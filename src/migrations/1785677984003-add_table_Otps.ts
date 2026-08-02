import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTableOtps1785677984003 implements MigrationInterface {
    name = 'AddTableOtps1785677984003'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`otps\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(50) NOT NULL, \`otpCode\` varchar(10) NOT NULL, \`isUsed\` tinyint NOT NULL DEFAULT 0, \`expiresAt\` timestamp NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`otps\``);
    }

}
