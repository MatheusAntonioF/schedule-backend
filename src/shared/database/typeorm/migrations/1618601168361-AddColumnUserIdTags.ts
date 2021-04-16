import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddColumnUserIdTags1618601168361 implements MigrationInterface {
  private userIdColumn = new TableColumn({ name: 'user_id', type: 'uuid' });

  private userIdForeignKey = new TableForeignKey({
    name: 'UserIdForeignKey',
    columnNames: ['user_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'users',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('tags', this.userIdColumn);

    return queryRunner.createForeignKey('tags', this.userIdForeignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('tags', this.userIdForeignKey);

    return queryRunner.dropColumn('tags', this.userIdColumn);
  }
}
