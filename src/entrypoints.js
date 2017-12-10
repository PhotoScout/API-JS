export const USER_AUTHENTICATION = {
  validateToken: {
    name: 'Validate JWT token',
    method: 'GET',
    url: '/user/auth',
    requireAuth: true
  },
  retrieveToken: {
    name: 'Retrieve JWT token',
    method: 'POST',
    url: '/user/auth',
    requireAuth: false,
    requirePassAuth: true
  }
}


export const GUIDES_LISTING = {
  listGuides: {
    name: 'Get a list of the user guides',
    method: 'GET',
    url: '/guides',
    requireAuth: true
  }
}