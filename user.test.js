// This test all the user entrypoints
import SurveyingMarmot from './src/SurveyingMarmotAPI'
import * as entrypoints from './src/entrypoints'
import nock from 'nock'

var sm = new SurveyingMarmot({url: "https://surveying-marmot.io"})
// var sm = new SurveyingMarmot({url: "http://localhost:5000"})

test('Token validation', async () => {
  // Test missing token validation
  var rn = nock('https://surveying-marmot.io/api/v1').get(entrypoints.USER_AUTHENTICATION.validateToken.url).reply(401,'Unauthorized Access')
  await expect(sm.ValidateToken()).rejects.toEqual({code:401, message: 'Unauthorized Access'})

  // Test invalid token validation
  var rn = nock('https://surveying-marmot.io/api/v1').get(entrypoints.USER_AUTHENTICATION.validateToken.url).reply(401,'Unauthorized Access')
  await expect(sm.ValidateToken('invalidtoken')).rejects.toEqual({code:401, message: 'Unauthorized Access'})

  // Test valid token validation
  var rn = nock('https://surveying-marmot.io/api/v1').get(entrypoints.USER_AUTHENTICATION.validateToken.url).reply(200)
  await expect(sm.ValidateToken('validToken')).resolves.toBe()
})

test('Token request', async () => {
  // Test missing credentials
  var rn = nock('https://surveying-marmot.io/api/v1').post(entrypoints.USER_AUTHENTICATION.retrieveToken.url).reply(401, 'Unauthorized Access')
  await expect(sm.RetrieveToken()).rejects.toEqual({code:401, message: 'Unauthorized Access'})

  // Test wrong credentials
  var rn = nock('https://surveying-marmot.io/api/v1').post(entrypoints.USER_AUTHENTICATION.retrieveToken.url).reply(401, 'Unauthorized Access')
  await expect(sm.RetrieveToken('john', 'doe')).rejects.toEqual({code:401, message: 'Unauthorized Access'})

  // Test valid credentials
  var rn = nock('https://surveying-marmot.io/api/v1').post(entrypoints.USER_AUTHENTICATION.retrieveToken.url).reply(200,{token: 'legitToken'})
  await expect(sm.RetrieveToken('john', 'doe')).resolves.toEqual('legitToken')
})

test('Get Public Guides', async () => {
  // Guide list
  var guideData =
  [
    {
      "id": 0,
      "title": "Example Guide",
      "featured_image": "http://foo.bar/image.jpg",
      "owner": "johndoe"
    }
  ]

  // Test public guides available
  var rn = nock('https://surveying-marmot.io/api/v1').get(entrypoints.GUIDES_LISTING.listGuidesPublic.url).reply(200, guideData)
  await expect(sm.GetPublicGuides()).resolves.toEqual(guideData)

  // Test no public guides available
  var rn = nock('https://surveying-marmot.io/api/v1').get(entrypoints.GUIDES_LISTING.listGuidesPublic.url).reply(200, [])
  await expect(sm.GetPublicGuides()).resolves.toEqual([])
})

test('Get User Guides', async () => {
  // Guide list
  var guideData =
  [
    {
      "id": 0,
      "title": "Example Guide",
      "featured_image": "http://foo.bar/image.jpg",
      "creation": "Thu, 1 Jan 1970 00:00:00 -0000",
      "last_edited": "Thu, 1 Jan 1970 00:00:00 -0000",
      "visibility": false,
      "number_photo": 42,
      "location": {
        "lattitude": "-17.685895",
        "longitude": "-63.36914"
      }
    }
  ]

  // Test user guides available
  var rn = nock('https://surveying-marmot.io/api/v1').get(entrypoints.GUIDES_LISTING.listGuides.url).reply(200, guideData)
  await expect(sm.GetGuides()).resolves.toEqual(guideData)

  // Test no user guides available
  var rn = nock('https://surveying-marmot.io/api/v1').get(entrypoints.GUIDES_LISTING.listGuides.url).reply(200, [])
  await expect(sm.GetGuides()).resolves.toEqual([])

  // Test invalid token
  var rn = nock('https://surveying-marmot.io/api/v1').get(entrypoints.GUIDES_LISTING.listGuides.url).reply(401, 'Unauthorized Access')
  await expect(sm.GetGuides()).rejects.toEqual({code:401, message: 'Unauthorized Access'})
})

test('Get Guide info', async () => {
  // Guide info
  var guideData =
  {
    "id": 0,
    "title": "Example Guide",
    "featured_image": "http://foo.bar/image.jpg",
    "creation": "Thu, 1 Jan 1970 00:00:00 -0000",
    "last_edited": "Thu, 1 Jan 1970 00:00:00 -0000",
    "visibility": false,
    "number_photo": 42,
    "location": {
      "lattitude": "-17.685895",
      "longitude": "-63.36914"
    }
  }

  // Test valid guide
  var rn = nock('https://surveying-marmot.io/api/v1').get(entrypoints.GUIDE.guideInfo.url).reply(200, guideData)
  await expect(sm.GetGuideInfo('validtoken')).resolves.toEqual(guideData)

  // Test missing guide
  var rn = nock('https://surveying-marmot.io/api/v1').get(entrypoints.GUIDE.guideInfo.url).reply(404, {error: 'Guide not found'})
  await expect(sm.GetGuideInfo('validtoken')).rejects.toEqual({code:404, message: {error: 'Guide not found'}})

  // Test invalid token
  var rn = nock('https://surveying-marmot.io/api/v1').get(entrypoints.GUIDE.guideInfo.url).reply(401, 'Unauthorized Access')
  await expect(sm.GetGuideInfo()).rejects.toEqual({code:401, message: 'Unauthorized Access'})
})