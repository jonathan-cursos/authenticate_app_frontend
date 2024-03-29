const passport = require('passport')
const axios = require('axios')
const { get } = require('lodash')
const { Strategy } = require('passport-twitter')
const config = require('../../config')

const TwitterStrategy = new Strategy(
  {
    consumerKey: config.twitter.consumerApiKey,
    consumerSecret: config.twitter.consumerApiSecret,
    callbackURL: '/auth/twitter/callback',
    includeEmail: true
  },
  async function (token, tokenSecret, profile, done) {
    try {
      const response = await axios({
        url: `${process.env.EXTERNAL_API}/api/user/sign-provider`,
        method: 'post',
        data: {
          firstName: profile.displayName,
          email: get(
            profile,
            'emails.0.value',
            `${profile.username}@twitter.com`
          ),
          password: profile.id.toString()
        }
      })
      if (!response.data) {
        return done(null, false, { message: 'Problem with loggin' })
      }

      return done(null, response.data)
    } catch (error) {
      console.log(error)
      done(error)
    }
  }
)

passport.use('twitter-auth', TwitterStrategy)
