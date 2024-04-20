export const apiRoutes = {
  auth: {
    login: '/auth/login'
  },
  users: {
    create: '/users',
    getMany: '/users',
    me: '/user/me',
    update: '/users/{id}',
    one: '/users/${id}',
  },
  occurrences: {
    create: '/occurrence',
    update: '/occurrence/{id}',
    one: '/occurrence/{id}',
    getMany: '/occurrence'
  }
}
