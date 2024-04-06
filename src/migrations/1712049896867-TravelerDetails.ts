import { MigrationInterface, QueryRunner } from "typeorm";

export class TravelerDetails1712049896867 implements MigrationInterface {
    name = 'TravelerDetails1712049896867'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cart\` ADD \`travelerEmail\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cart\` DROP COLUMN \`travelerEmail\``);
    }

}
