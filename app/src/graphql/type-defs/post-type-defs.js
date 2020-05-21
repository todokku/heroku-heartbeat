import { gql } from 'apollo-server';

export default gql`
  extend type Query {
    getPosts: [Post!]!
    getPostById(postId: ID!): Post
  }

  extend type Mutation {
    createPost(message: String!): Post!
    deletePost(postId: ID!): String!
  }
  
  type Post {
    id: ID!
    message: String!
    user: ID!
  }
`;
