// This test all the user entrypoints
import SurveyingMarmot from './src/SurveyingMarmotAPI'
import * as entrypoints from './src/entrypoints'
import nock from 'nock'

var sm = new SurveyingMarmot({url: "https://surveying-marmot.io"})

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
    var rn = nock('https://surveying-marmot.io/api/v1').post(entrypoints.USER_AUTHENTICATION.retrieveToken.url).reply(401,'Unauthorized Access')
    await expect(sm.RetrieveToken()).rejects.toEqual({code:401, message: 'Unauthorized Access'})

    // Test wrong credentials
    var rn = nock('https://surveying-marmot.io/api/v1').post(entrypoints.USER_AUTHENTICATION.retrieveToken.url).reply(401,'Unauthorized Access')
    await expect(sm.RetrieveToken('john', 'doe')).rejects.toEqual({code:401, message: 'Unauthorized Access'})

    // Test valid credentials
    var rn = nock('https://surveying-marmot.io/api/v1').post(entrypoints.USER_AUTHENTICATION.retrieveToken.url).reply(200,{token: 'legitToken'})
    await expect(sm.RetrieveToken('john', 'doe')).resolves.toEqual('legitToken')
})