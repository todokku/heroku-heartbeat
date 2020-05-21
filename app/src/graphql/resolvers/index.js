import { login, register } from './user-resolvers';
import { getPosts, getPostById, createPost, deletePost } from './post-resolvers';

export default {
  Query: {
    getPosts,
    getPostById,
  },
  Mutation: {
    login,
    register,
    createPost,
    deletePost,
  },
};
