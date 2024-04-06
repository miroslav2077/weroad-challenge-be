import { MigrationInterface, QueryRunner } from "typeorm";

export class CartIsPaidFieldAdded1712425865912 implements MigrationInterface {
    name = 'CartIsPaidFieldAdded1712425865912'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cart\` ADD \`isPaid\` tinyint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cart\` DROP COLUMN \`isPaid\``);
    }

}
