import { MigrationInterface, QueryRunner } from "typeorm";

export class CartIsPaidFieldDefaultValue1712426800696 implements MigrationInterface {
    name = 'CartIsPaidFieldDefaultValue1712426800696'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cart\` CHANGE \`isPaid\` \`isPaid\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cart\` CHANGE \`isPaid\` \`isPaid\` tinyint NOT NULL`);
    }

}
