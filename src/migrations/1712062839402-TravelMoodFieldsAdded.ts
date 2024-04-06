import { MigrationInterface, QueryRunner } from "typeorm";

export class TravelMoodFieldsAdded1712062839402 implements MigrationInterface {
    name = 'TravelMoodFieldsAdded1712062839402'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`nature\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`relax\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`history\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`culture\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`party\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`party\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`culture\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`history\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`relax\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`nature\``);
    }

}
