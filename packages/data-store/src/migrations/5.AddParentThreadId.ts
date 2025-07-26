import Debug from 'debug'
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'
import { migrationGetExistingTableByName } from './migration-functions'

const debug = Debug('veramo:data-store:migrate-parent-thread-id')

export class AddParentThreadId1753542709712 implements MigrationInterface {
    name = 'AddParentThreadId1753542709712'

    public async up(queryRunner: QueryRunner): Promise<void> {
        debug(`Running migration 'AddParentThreadId1753542709712'`)

        const table = migrationGetExistingTableByName(queryRunner, 'message');
        const hasColumn = table?.findColumnByName('parentThreadId');

        if (!hasColumn) {
            debug(`adding 'parentThreadId' column to 'message' table`)
            await queryRunner.addColumn(table, new TableColumn({
                name: 'parentThreadId',
                type: 'varchar',
                isNullable: true,
            }))
            debug(`added 'parentThreadId' column to 'message' table`)
        }

        debug(`Migration 'AddParentThreadId1753542709712' completed successfully`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        debug(`Rolling back migration 'AddParentThreadId1753542709712'`)

        const table = migrationGetExistingTableByName(queryRunner, 'message');
        const hasColumn = table?.findColumnByName('parentThreadId');

        if (hasColumn) {
            debug(`removing 'parentThreadId' column from 'message' table`)
            await queryRunner.dropColumn(table, 'parentThreadId')
            debug(`removed 'parentThreadId' column from 'message' table`)
        }

        debug(`Migration 'AddParentThreadId1753542709712' rolled back successfully`)
    }
}
