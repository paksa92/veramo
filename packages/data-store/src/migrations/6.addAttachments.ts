import Debug from 'debug'
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'
import { migrationGetExistingTableByName } from './migration-functions'

const debug = Debug('veramo:data-store:migrate-add-attachments')

export class AddAttachments1753543810823 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        debug(`Running migration 'AddAttachments1753543810823'`)

        const table = migrationGetExistingTableByName(queryRunner, 'message')
        table.addColumn(
            new TableColumn({
                name: "attachments",
                type: "text",
                isNullable: true,
            })
        )
        debug(`adding 'attachments' column to '${table.name}' table`)
        await queryRunner.addColumn(table, table.columns[table.columns.length - 1])
        debug(`added 'attachments' column to '${table.name}' table`)

        debug(`Migration 'AddAttachments1753543810823' completed successfully`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        debug(`Rolling back migration 'AddAttachments1753543810823'`)

        const table = migrationGetExistingTableByName(queryRunner, 'message')
        debug(`removing 'attachments' column from '${table.name}' table`)
        await queryRunner.dropColumn(table, 'attachments')
        debug(`removed 'attachments' column from '${table.name}' table`)

        debug(`Migration 'AddAttachments1753543810823' rolled back successfully`)
    }
}
