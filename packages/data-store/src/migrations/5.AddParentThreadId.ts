import Debug from 'debug'
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'
import { migrationGetExistingTableByName } from './migration-functions'

const debug = Debug('veramo:data-store:migrate-parent-thread-id')

export class AddParentThreadId1753542709712 implements MigrationInterface {
    name = 'AddParentThreadId1753542709712'

    public async up(queryRunner: QueryRunner): Promise<void> {
        debug(`Running migration 'AddParentThreadId1753542709712'`)

        if (queryRunner.connection.driver.options.type === 'sqlite') {
            debug(`splitting migration into multiple transactions to allow sqlite table updates`)
            await queryRunner.commitTransaction()
            debug(`turning off foreign keys`)
            await queryRunner.query('PRAGMA foreign_keys=off')
            await queryRunner.startTransaction()
        }

        debug(`adding 'parentThreadId' column to 'message' table`)
        await queryRunner.addColumn(migrationGetExistingTableByName(queryRunner, 'message', true), new TableColumn({
            name: 'parentThreadId',
            type: 'varchar',
            isNullable: true,
        }))
        debug(`added 'parentThreadId' column to 'message' table`)

        if (queryRunner.connection.driver.options.type === 'sqlite') {
            debug(`splitting migration into multiple transactions to allow sqlite table updates`)
            await queryRunner.commitTransaction()
            debug(`turning on foreign keys`)
            await queryRunner.query('PRAGMA foreign_keys=on')
            await queryRunner.startTransaction()
        }

        debug(`Migration 'AddParentThreadId1753542709712' completed successfully`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        debug(`Rolling back migration 'AddParentThreadId1753542709712'`)

        if (queryRunner.connection.driver.options.type === 'sqlite') {
            debug(`splitting migration into multiple transactions to allow sqlite table updates`)
            await queryRunner.commitTransaction()
            debug(`turning off foreign keys`)
            await queryRunner.query('PRAGMA foreign_keys=off')
            await queryRunner.startTransaction()
        }

        debug(`removing 'parentThreadId' column from 'message' table`)
        await queryRunner.dropColumn(migrationGetExistingTableByName(queryRunner, 'message'), 'parentThreadId')
        debug(`removed 'parentThreadId' column from 'message' table`)

        if (queryRunner.connection.driver.options.type === 'sqlite') {
            debug(`splitting migration into multiple transactions to allow sqlite table updates`)
            await queryRunner.commitTransaction()
            debug(`turning on foreign keys`)
            await queryRunner.query('PRAGMA foreign_keys=on')
            await queryRunner.startTransaction()
        }

        debug(`Migration 'AddParentThreadId1753542709712' rolled back successfully`)
    }
}
