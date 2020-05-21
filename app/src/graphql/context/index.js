import getUserContext from './user-context';

export default ({ req, res }) => ({
  user: getUserContext(req),
});
