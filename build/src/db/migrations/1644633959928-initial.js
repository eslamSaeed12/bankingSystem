"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initial1644633959928 = void 0;
class initial1644633959928 {
    name = 'initial1644633959928';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "customers" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "balance" double precision NOT NULL DEFAULT '0', CONSTRAINT "UQ_b942d55b92ededa770041db9ded" UNIQUE ("name"), CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transfers" ("id" SERIAL NOT NULL, "amount" double precision NOT NULL, "senderIdId" integer, "receiverIdId" integer, CONSTRAINT "REL_07f538aad9e77409c4f6db10d3" UNIQUE ("senderIdId"), CONSTRAINT "REL_f8622ed0088eb311ef648546ab" UNIQUE ("receiverIdId"), CONSTRAINT "PK_f712e908b465e0085b4408cabc3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "transfers" ADD CONSTRAINT "FK_07f538aad9e77409c4f6db10d33" FOREIGN KEY ("senderIdId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transfers" ADD CONSTRAINT "FK_f8622ed0088eb311ef648546ab4" FOREIGN KEY ("receiverIdId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "transfers" DROP CONSTRAINT "FK_f8622ed0088eb311ef648546ab4"`);
        await queryRunner.query(`ALTER TABLE "transfers" DROP CONSTRAINT "FK_07f538aad9e77409c4f6db10d33"`);
        await queryRunner.query(`DROP TABLE "transfers"`);
        await queryRunner.query(`DROP TABLE "customers"`);
    }
}
exports.initial1644633959928 = initial1644633959928;
