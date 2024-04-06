import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductTotalSpots1712356519704 implements MigrationInterface {
    name = 'ProductTotalSpots1712356519704'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`totalSpots\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`totalSpots\``);
    }

}
