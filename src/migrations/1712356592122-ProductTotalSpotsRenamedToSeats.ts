import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductTotalSpotsRenamedToSeats1712356592122 implements MigrationInterface {
    name = 'ProductTotalSpotsRenamedToSeats1712356592122'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`totalSpots\` \`totalSeats\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`totalSeats\` \`totalSpots\` int NOT NULL`);
    }

}
