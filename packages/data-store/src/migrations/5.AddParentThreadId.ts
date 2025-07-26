import Debug from 'debug'
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'
import { migrationGetExistingTableByName } from './migration-functions'

const debug = Debug('veramo:data-store:migrate-parent-thread-id')

export class AddParentThreadId1753542709712 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        debug(`Running migration 'AddParentThreadId1753542709712'`)

        const table = migrationGetExistingTableByName(queryRunner, 'message')
        table.addColumn(
            new TableColumn({
                name: 'parentThreadId',
                type: 'varchar',
                isNullable: true,
            }),
        );
        table.addColumn(
            new TableColumn({
                name: "attachments",
                type: "text",
                isNullable: true,
            })
        )
        debug(`adding 'parentThreadId' column to '${table.name}' table`)
        await queryRunner.addColumn(table, table.columns[table.columns.length - 2])
        debug(`added 'parentThreadId' column to '${table.name}' table`)
        debug(`adding 'attachments' column to '${table.name}' table`)
        await queryRunner.addColumn(table, table.columns[table.columns.length - 1])
        debug(`added 'attachments' column to '${table.name}' table`)

        debug(`Migration 'AddParentThreadId1753542709712' completed successfully`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        debug(`Rolling back migration 'AddParentThreadId1753542709712'`)

        const table = migrationGetExistingTableByName(queryRunner, 'message')
        debug(`removing 'parentThreadId' column from '${table.name}' table`)
        await queryRunner.dropColumn(table, 'parentThreadId')
        debug(`removed 'parentThreadId' column from '${table.name}' table`)
        debug(`removing 'attachments' column from '${table.name}' table`)
        await queryRunner.dropColumn(table, 'attachments')
        debug(`removed 'attachments' column from '${table.name}' table`)

        debug(`Migration 'AddParentThreadId1753542709712' rolled back successfully`)
    }
}
