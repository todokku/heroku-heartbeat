import path from 'path';
import { env } from 'custom-env';

import database from '..';

(async () => {
  env(process.env.NODE_ENV, path.join(__dirname, '../../../'));
  try {
    const instance = await database.connect();
    await instance.connection.db.dropDatabase();
    await database.disconnect();

    console.log('Database wiped!');
    process.exit(0);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
})();
