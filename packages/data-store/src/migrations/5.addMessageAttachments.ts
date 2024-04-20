import Debug from 'debug'
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

const debug = Debug('veramo:data-store:add-message-attachments-migration')

export class AddMessageAttachments1713573995342 implements MigrationInterface {
  name = 'AllowNullIssuanceDateForPresentations1637237492913' // Used in case this class gets minified, which would change the classname

  public async up(queryRunner: QueryRunner): Promise<void> {
    debug(`adding message attachments column`)
    await queryRunner.addColumn(
      'message',
      new TableColumn({
        name: 'attachments',
        type: 'text',
        isNullable: true,
        default: null,
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    debug('removing message attachments column')
    await queryRunner.dropColumn('message', 'attachments')
  }
}
