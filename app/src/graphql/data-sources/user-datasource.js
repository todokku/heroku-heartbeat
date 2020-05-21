import bcrypt from 'bcryptjs';
import { DataSource } from 'apollo-datasource';
import { UserInputError } from 'apollo-server';

import { User } from '../../database/models';
import { generateJWTToken } from '../utils';

export default class UserAPI extends DataSource {
  constructor() {
    super();
  }

  initialize(config) {
    this.context = config.context;
  }

  async login(loginInput) {
    const { username, password } = loginInput;

    const user = await User.findOne({ username });
    if (!user) throw new UserInputError('User not found');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UserInputError('Wrong credentials');

    return {
      token: generateJWTToken(user),
      user: {
        ...user._doc,
        id: user._id,
      },
    };
  }

  async register(registerInput) {
    const { username, password } = registerInput;

    const user = await User.findOne({ username });
    if (user) throw new UserInputError('Username is taken');

    const newUser = new User({
      username,
      password: await bcrypt.hash(password, 12),
    });

    const res = await newUser.save();
    return {
      ...res._doc,
      id: res._id,
    };
  }
}
