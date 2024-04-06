import { MigrationInterface, QueryRunner } from "typeorm";

export class TablesCreation1712002191783 implements MigrationInterface {
    name = 'TablesCreation1712002191783'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`product\` (\`id\` varchar(36) NOT NULL, \`slug\` varchar(100) NOT NULL, \`name\` varchar(100) NOT NULL, \`description\` varchar(800) NOT NULL, \`startingDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`endingDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`price\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cart\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`expiresAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`travelerAmount\` int NOT NULL, \`unitPrice\` int NOT NULL, \`totalAmount\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`cart\``);
        await queryRunner.query(`DROP TABLE \`product\``);
    }

}
