import Request from './request'
import * as entrypoints from './entrypoints'

class SurveyingMarmot{
  constructor (options) {
    this.baseUrl = options.url
    this.req = new Request(this.baseUrl)
  }

  ValidateToken(token) {
    return new Promise((resolve, reject) => {
      this.req.Call(entrypoints.USER_AUTHENTICATION.validateToken, {token: token}).then(
        data => resolve()
      ).catch(
        data => reject({code:data.statusCode, message: data.error})
      )
    })
  }

  RetrieveToken(username, password) {
    return new Promise((resolve, reject) => {
      this.req.Call(entrypoints.USER_AUTHENTICATION.retrieveToken, {username: username, password: password}).then(
        data => resolve(data.token)
      ).catch(
        data => reject({code:data.statusCode, message: data.error})
      )
    })
  }

  GetGuides(token) {
    return new Promise((resolve, reject) => {
      this.req.Call(entrypoints.GUIDES_LISTING.listGuides, {token: token}).then(
        data => resolve(data)
      ).catch(
        data => reject({code:data.statusCode, message: data.error})
      )
    })
  }

}

export default SurveyingMarmot