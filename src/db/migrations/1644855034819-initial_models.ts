import {MigrationInterface, QueryRunner} from "typeorm";

export class initialModels1644855034819 implements MigrationInterface {
    name = 'initialModels1644855034819'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "customers" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "balance" double precision NOT NULL DEFAULT '0', CONSTRAINT "UQ_b942d55b92ededa770041db9ded" UNIQUE ("name"), CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transfers" ("id" SERIAL NOT NULL, "amount" double precision NOT NULL, "senderId" integer, "receiverId" integer, CONSTRAINT "REL_d6385758cb5394ac2fdbfe118a" UNIQUE ("senderId"), CONSTRAINT "REL_6d8e1008c743bac0b9c9266151" UNIQUE ("receiverId"), CONSTRAINT "PK_f712e908b465e0085b4408cabc3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "transfers" ADD CONSTRAINT "FK_d6385758cb5394ac2fdbfe118a3" FOREIGN KEY ("senderId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transfers" ADD CONSTRAINT "FK_6d8e1008c743bac0b9c92661512" FOREIGN KEY ("receiverId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transfers" DROP CONSTRAINT "FK_6d8e1008c743bac0b9c92661512"`);
        await queryRunner.query(`ALTER TABLE "transfers" DROP CONSTRAINT "FK_d6385758cb5394ac2fdbfe118a3"`);
        await queryRunner.query(`DROP TABLE "transfers"`);
        await queryRunner.query(`DROP TABLE "customers"`);
    }

}
