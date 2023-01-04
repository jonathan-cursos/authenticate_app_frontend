const passport = require('passport')
const { Strategy } = require('passport-facebook')
const axios = require('axios')
const { facebook } = require('../../config')

const FacebookStrategy = new Strategy(
  {
    clientID: facebook.clientAppId,
    clientSecret: facebook.clientAppSecret,
    callbackURL:
      'https://authenticate-app-full.onrender.com/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'email']
  },
  async function (accessToken, refreshToken, profile, done) {
    console.log(profile)
    try {
      const email = profile.email ? profile.email : `${profile.id}@facebook.com`
      const response = await axios({
        url: 'https://authenticate-app-full.onrender.com/api/user/sign-provider',
        method: 'post',
        data: {
          firstName: profile.displayName,
          email: email,
          password: profile.id
        }
      })

      if (!response.data) {
        return done(null, false, { message: 'Problem with loggin' })
      }

      return done(null, response.data)
    } catch (error) {
      done(error)
    }
  }
)

passport.use('facebook-auth', FacebookStrategy)
