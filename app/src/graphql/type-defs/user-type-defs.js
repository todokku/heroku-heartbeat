import { gql } from 'apollo-server';

export default gql`
  extend type Mutation {
    login(loginInput: LoginInput): LoginResponse!
    register(registerInput: RegisterInput): User!
  }
  
  input LoginInput {
    username: String!
    password: String!
  }

  input RegisterInput {
    username: String!
    password: String!
  }

  type LoginResponse {
    token: String!
    user: User!
  }
  
  type User {
    id: ID!
    username: String!
  }
`;
