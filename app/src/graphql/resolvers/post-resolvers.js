import { authGuard } from '../utils';

export const getPosts = (_, __, { dataSources }) => {
  return dataSources.postAPI.getPosts();
};

export const getPostById = (_, { postId }, { dataSources }) => {
  return dataSources.postAPI.getPostById(postId);
};

export const createPost = authGuard( (_, { message }, { dataSources }) => {
  return dataSources.postAPI.createPost(message);
});

export const deletePost = authGuard( (_, { postId }, { dataSources }) => {
  return dataSources.postAPI.deletePost(postId);
});
