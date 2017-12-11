import request from 'request'
import rp from 'request-promise-native'


class Request {
  constructor (url) {
      this.baseUrl = url
  }

  MakeUrlArgs(args) {
    var argsString = []
    Object.keys(args).map(function(key, index) {
      if(args[key] instanceof Array) {
        argsString.push(key + "=" + args[key].join("+"))
      }
      else {
        argsString.push(key + "=" + args[key])
      }
    })
    return argsString.join("&")
  }

  MakeUrl(entrypoint, args) {
    if(args)
      return this.baseUrl + "/api/v1" + entrypoint +"?" + this.MakeUrlArgs(args)
    else
      return this.baseUrl + "/api/v1" + entrypoint
  }

  Call(entrypoint, options) {
    var args = undefined
    var body = undefined
    if(options) {
      args = options.args || undefined
      body = options.body || undefined
    }
    var requestOptions = {
      method: entrypoint.method,
      uri: this.MakeUrl(entrypoint.url, args),
      json: true,
      body: body
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
