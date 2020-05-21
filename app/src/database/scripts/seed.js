import path from 'path';
import { env } from 'custom-env';

import database from '..';
import { User, Post } from '../models';

(async () => {
  env(process.env.NODE_ENV, path.join(__dirname, '../../../'));
  try {
    await database.connect();

    /** Create a dummy user */
    const user = await new User({
      username: 'username',
      password: 'password',
    }).save();

    /** Create 10 dummy posts from that user */
    await Post.insertMany([...Array(10)].map((_, i) => ({
      message: `Dummy post #${i + 1}`,
      user: user._id,
    })));

    await database.disconnect();

    console.log('Database seeded!');
    process.exit(0);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
})();
