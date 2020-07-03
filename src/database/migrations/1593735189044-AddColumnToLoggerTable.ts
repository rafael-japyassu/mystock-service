import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export default class AddColumnToLoggerTable1593735189044 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('loggers', new TableColumn({
      name: 'table',
      type: 'varchar'
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('loggers', 'table')
  }
}
