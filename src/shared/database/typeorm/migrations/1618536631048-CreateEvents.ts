import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateEvents1618536631048 implements MigrationInterface {
  private eventsTable = new Table({
    name: 'events',
    columns: [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()',
      },
      {
        name: 'name',
        type: 'varchar',
      },
      {
        name: 'description',
        type: 'varchar',
      },
      {
        name: 'date',
        type: 'timestamp with time zone',
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
  });

  private eventsUserForeignKey = new TableForeignKey({
    name: 'EventUsersForeignKey',
    columnNames: ['user_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'users',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.eventsTable);

    return queryRunner.createForeignKey('events', this.eventsUserForeignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('events', this.eventsUserForeignKey);

    return queryRunner.dropTable('events');
  }
}
