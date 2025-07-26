import Debug from 'debug'
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'
import { migrationGetExistingTableByName } from './migration-functions'

const debug = Debug('veramo:data-store:migrate-add-attachments')

export class AddAttachments1753543810823 implements MigrationInterface {
    name = 'AddAttachments1753543810823'

    public async up(queryRunner: QueryRunner): Promise<void> {
        debug(`Running migration 'AddAttachments1753543810823'`)

        debug(`adding 'attachments' column to 'message' table`)
        await queryRunner.addColumn(migrationGetExistingTableByName(queryRunner, 'message', true), new TableColumn({
            name: "attachments",
            type: "text",
            isNullable: true,
        }))
        debug(`added 'attachments' column to 'message' table`)

        debug(`Migration 'AddAttachments1753543810823' completed successfully`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        debug(`Rolling back migration 'AddAttachments1753543810823'`)

        debug(`removing 'attachments' column from 'message' table`)
        await queryRunner.dropColumn(migrationGetExistingTableByName(queryRunner, 'message', true), 'attachments')
        debug(`removed 'attachments' column from 'message' table`)

        debug(`Migration 'AddAttachments1753543810823' rolled back successfully`)
    }
}
