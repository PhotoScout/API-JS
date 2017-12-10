import request from 'request'
import rp from 'request-promise-native'


class Request {
  constructor (url) {
      this.baseUrl = url
  }

  MakeAuthHeaderToken(token) {
    return "Basic " + btoa(token + ":*")
  }

  MakeAuthHeaderPass(username, password) {
    return "Basic " + btoa(username + ":" + password)
  }

  MakeUrl(entrypoint){
    return this.baseUrl + "/api/v1" + entrypoint
  }

  Call(entrypoint, options) {
      var requestOptions = {
        method: entrypoint.method,
        uri: this.MakeUrl(entrypoint.url),
        json: true
      }

      // If we need an auth header (token based)
      if(entrypoint.requireAuth) {
        requestOptions.auth = {username: options.token || '', password: '*'}
      }

      if(entrypoint.requirePassAuth) {
        requestOptions.auth = {username: options.username || '', password: options.password || ''}
      }

      return rp(requestOptions)
  }
}
export default Request
