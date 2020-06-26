import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export default class CreateProducts1593197610903 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'products',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()'
        },
        {
          name: 'name',
          type: 'varchar'
        },
        {
          name: 'description',
          type: 'text'
        },
        {
          name: 'category_id',
          type: 'uuid',
          isNullable: true
        },
        {
          name: 'price',
          type: 'decimal',
          precision: 10,
          scale: 2
        },
        {
          name: 'stock',
          type: 'int',
          default: 0
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()'
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'now()'
        }
      ]
    }))

    await queryRunner.createForeignKey(
      'products',
      new TableForeignKey({
        name: 'CategoryProcutc',
        columnNames: ['category_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'categories',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products')
  }
}
