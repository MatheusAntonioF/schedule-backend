import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateEventTags1618540837882 implements MigrationInterface {
  private eventTagsTable = new Table({
    name: 'events_tags',
    columns: [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()',
      },
      {
        name: 'event_id',
        type: 'uuid',
      },
      {
        name: 'tag_id',
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

  private tagForegnKey = new TableForeignKey({
    name: 'TagsForeignKey',
    columnNames: ['tag_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'tags',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  private eventForegnKey = new TableForeignKey({
    name: 'EventsForeignKey',
    columnNames: ['event_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'events',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.eventTagsTable);

    return queryRunner.createForeignKeys('events_tags', [
      this.tagForegnKey,
      this.eventForegnKey,
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKeys('events_tags', [
      this.tagForegnKey,
      this.eventForegnKey,
    ]);

    return queryRunner.dropTable('events_tags');
  }
}
