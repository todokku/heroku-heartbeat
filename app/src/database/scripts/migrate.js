import Umzug from 'umzug';
import path from 'path';
import { env } from 'custom-env';

import database from '..';

(async () => {
  env(process.env.NODE_ENV, path.join(__dirname, '../../../'));
  try {
    const instance = await database.connect();
    const umzug = new Umzug({
      migrations: {
        path: path.join(__dirname, '../migrations'),
        params: [instance],
      },
      storage: 'mongodb',
      storageOptions: {
        connection: instance.connection,
        collectionName: 'migrations',
      },
    });

    const migrationType = process.argv[2];
    const migrationVersion = process.argv[3];
    switch (migrationType) {
      case 'up':
        await umzug.up({ to: migrationVersion });
        break;
      case 'down':
        await umzug.down({ to: migrationVersion });
        break;
      default:
        throw new Error('Invalid migration type. Must pass either "up" or "down"');
    }

    await database.disconnect();

    console.log('Migrations ran successfully!');
    process.exit(0);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
})();
