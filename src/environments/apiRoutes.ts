export const apiRoutes = {
  auth: {
    login: '/auth/login',
    invited: '/auth/invited',
  },
  users: {
    create: '/users',
    getMany: '/users',
    me: '/users/me',
    update: '/users/{id}',
    one: '/users/one/{id}',
  },
  occurrences: {
    create: '/occurrences',
    update: '/occurrences/{id}',
    one: '/occurrences/one/{id}',
    getMany: '/occurrences'
  },
  medias: {
    post: '/medias'
  }
}
