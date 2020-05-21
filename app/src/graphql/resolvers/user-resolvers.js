export const login = (_, { loginInput }, { dataSources }) => {
  return dataSources.userAPI.login(loginInput);
};

export const register = (_, { registerInput }, { dataSources }) => {
  return dataSources.userAPI.register(registerInput);
};
