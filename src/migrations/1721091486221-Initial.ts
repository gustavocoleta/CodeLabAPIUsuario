import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1721091486221 implements MigrationInterface {
  name = 'Initial1721091486221';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "usuariopermissao" ("id" SERIAL NOT NULL, "idUsuario" integer NOT NULL, "modulo" integer NOT NULL, CONSTRAINT "pk_usuariopermissao" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "usuario" ("id" SERIAL NOT NULL, "nome" character varying(60) NOT NULL, "email" character varying NOT NULL, "senha" character varying NOT NULL, "ativo" boolean NOT NULL, "admin" boolean NOT NULL, CONSTRAINT "un_email" UNIQUE ("email"), CONSTRAINT "pk_usuario" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "recuperacaosenha" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "dataCriacao" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "pk_recuperacao_senha" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "usuariopermissao" ADD CONSTRAINT "fk_permissao_usuario" FOREIGN KEY ("idUsuario") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "usuariopermissao" DROP CONSTRAINT "fk_permissao_usuario"`,
    );
    await queryRunner.query(`DROP TABLE "recuperacaosenha"`);
    await queryRunner.query(`DROP TABLE "usuario"`);
    await queryRunner.query(`DROP TABLE "usuariopermissao"`);
  }
}
