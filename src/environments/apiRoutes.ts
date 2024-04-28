export const apiRoutes = {
  auth: {
    login: '/auth/login'
  },
  users: {
    create: '/users',
    getMany: '/users',
    me: '/users/me',
    update: '/users/one/{id}',
    one: '/users/${id}',
  },
  occurrences: {
    create: '/occurrences',
    update: '/occurrences/{id}',
    one: '/occurrences/one/{id}',
    getMany: '/occurrences'
  }
}
