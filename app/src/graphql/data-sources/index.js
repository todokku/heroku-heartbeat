import UserAPI from './user-datasource';
import PostAPI from './post-datasource';

export default () => ({
  userAPI: new UserAPI(),
  postAPI: new PostAPI(),
});
