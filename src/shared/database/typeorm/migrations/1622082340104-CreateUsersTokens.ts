import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersTokens1622082340104 implements MigrationInterface {
  private usersTokens = new Table({
    name: 'users_tokens',
    columns: [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()',
      },
      {
        name: 'refresh_token',
        type: 'uuid',
      },
      {
        name: 'expires_in',
        type: 'timestamp',
      },
      {
        name: 'user_id',
        type: 'uuid',
      },
      {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()',
      },
      {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()',
      },
    ],
    foreignKeys: [
      {
        name: 'ForeignKeyUser',
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.createTable(this.usersTokens);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.dropTable(this.usersTokens);
  }
}
