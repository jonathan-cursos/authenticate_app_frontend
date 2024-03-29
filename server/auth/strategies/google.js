const passport = require('passport')
const axios = require('axios')
const { OAuth2Strategy } = require('passport-oauth')
const { google } = require('../../config')
const GOOGLE_AUTHORIZATION_URL = 'https://accounts.google.com/o/oauth2/auth'
const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token'
const GOOGLE_USERINFO_URL = 'https://www.googleapis.com/oauth2/v3/userinfo'

const oAuth2Strategy = new OAuth2Strategy(
  {
    authorizationURL: GOOGLE_AUTHORIZATION_URL,
    tokenURL: GOOGLE_TOKEN_URL,
    clientID: google.clientId,
    clientSecret: google.clientSecret,
    callbackURL:
      'https://authenticate-app-full.onrender.com/auth/google/callback'
  },
  async function (accessToken, refreshToken, profile, done) {
    try {
      const response = await axios({
        // url: "https://authenticate-app-j.herokuapp.com/api/user/sign-provider",
        url: 'https://authenticate-app-basic-strategy.onrender.com/api/user/sign-provider',
        method: 'post',
        data: {
          firstName: profile.firstName,
          lastName: profile.lastName,
          email: profile.email,
          password: profile.id
        }
      })

      if (!response.data) {
        return done(null, false, { message: 'Problem with login' })
      }

      return done(null, response.data)
    } catch (err) {
      console.log(err)
    }
  }
)

oAuth2Strategy.userProfile = function (accessToken, done) {
  this._oauth2.get(GOOGLE_USERINFO_URL, accessToken, function (err, body) {
    if (err) {
      return done(err)
    }

    try {
      const { sub, given_name, family_name, email } = JSON.parse(body)
      const profile = {
        id: sub,
        firstName: given_name,
        lastName: family_name,
        email
      }
      done(null, profile)
    } catch (error) {
      console.log(error)
      return done(error)
    }
  })
}

passport.use('google-auth', oAuth2Strategy)
