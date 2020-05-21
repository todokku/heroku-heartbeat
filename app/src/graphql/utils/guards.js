import { AuthenticationError } from 'apollo-server';

export const authGuard = (next) => (root, args, context, info) => {
  if (!context.user) throw new AuthenticationError('Not authenticated');

  return next(root, args, context, info);
};
