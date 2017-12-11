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
  listGuidesPublic: {
    name: 'Get a list of the user guides',
    method: 'GET',
    url: '/public/guides',
    requireAuth: false
  },

  listGuides: {
    name: 'Get a list of the user guides',
    method: 'GET',
    url: '/guides',
    requireAuth: true
  }
}

export const GUIDE = {
  guideInfo: {
    name: 'Get the information for a guide',
    method: 'GET',
    url: '/guide',
    requireAuth: true
  },

  createGuide: {
    name: 'Create a new guide',
    method: 'POST',
    url: '/guide',
    requireAuth: true
  },

  editGuide: {
    name: 'Modify the guide information',
    method: 'PATCH',
    url: '/guide',
    requireAuth: true
  },

  deleteGuide: {
    name: 'Delete a guide',
    method: 'DELETE',
    url: '/guide',
    requireAuth: true
  }
}